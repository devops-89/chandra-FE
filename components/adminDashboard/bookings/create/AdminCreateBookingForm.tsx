'use client';

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { useFormik } from 'formik';
import { AlertCircle, Calendar, User, Wrench } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as yup from 'yup';

import { AdminControllers } from '@/api/adminControllers';
import type { FieldValue } from '@/components/booking/DynamicBookingFields';
import type { AdminService } from '@/types/admin/service.types';
import type { BookingFormField } from '@/types/services.types';

import AdminDynamicBookingFields from './AdminDynamicBookingFields';

const baseSchema = yup.object({
  customerId: yup.string().required('Customer is required'),
  addressId: yup.string().required('Address is required'),
  serviceId: yup.string().required('Service is required'),
  technicianId: yup.string().required('Technician is required'),
  scheduledAt: yup.string().required('Schedule date and time is required'),
});

export default function AdminCreateBookingForm() {
  const router = useRouter();
  
  const [customers, setCustomers] = useState<any[]>([]);
  const [technicians, setTechnicians] = useState<any[]>([]);
  const [services, setServices] = useState<AdminService[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [dynamicFields, setDynamicFields] = useState<BookingFormField[]>([]);
  const [isServiceLoading, setIsServiceLoading] = useState(false);
  
  const [validationSchema, setValidationSchema] = useState<any>(baseSchema);

  const formik = useFormik({
    initialValues: {
      customerId: '',
      addressId: '',
      serviceId: '',
      technicianId: '',
      scheduledAt: '',
    } as Record<string, any>,
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitError(null);
      try {
        const selectedService = services.find((s: any) => (s.serviceId || s.id) === Number(values.serviceId));
        
        const serviceSpecifications = selectedService?.specifications?.map((spec: any) => {
          return {
            specificationId: spec.id,
            value: values[spec.name] ? String(values[spec.name]) : ''
          };
        }).filter((s: any) => s.value !== '') || [];

        const payload = {
          customerId: Number(values.customerId),
          customerAddressId: Number(values.addressId),
          technicianId: Number(values.technicianId),
          serviceId: Number(values.serviceId),
          scheduledAt: new Date(values.scheduledAt).toISOString(),
          isEmergency: false,
          serviceSpecifications,
        };

        await AdminControllers.createAdminBooking(payload);
        router.push('/admin/bookings');
        router.refresh();
      } catch (err: any) {
        console.error(err);
        setSubmitError(err.message || 'Failed to create booking');
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [custRes, servRes] = await Promise.all([
          AdminControllers.getAllCustomers(),
          AdminControllers.getAllServicesForAdmin(),
        ]);
        const validCustomers = (Array.isArray(custRes) ? custRes : []).filter(
          (c: any) => c.addresses && c.addresses.length > 0
        );
        setCustomers(validCustomers);
        setServices(Array.isArray(servRes) ? servRes : []);
      } catch (err) {
        console.error('Failed to load data', err);
        setSubmitError('Failed to load initial data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Reset address if customer changes
  useEffect(() => {
    if (formik.values.customerId) {
      const selectedCustomer = customers.find(c => c.id === Number(formik.values.customerId));
      const addresses = selectedCustomer?.addresses || [];
      if (formik.values.addressId && !addresses.find((a: any) => a.id === Number(formik.values.addressId))) {
        formik.setFieldValue('addressId', '');
      }
    } else {
      formik.setFieldValue('addressId', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.customerId, customers]);

  // When a service is selected, build the dynamic fields configuration
  useEffect(() => {
    // Reset technician and dynamic fields on service change
    if (!formik.values.serviceId) {
      setDynamicFields([]);
      setTechnicians([]);
      formik.setFieldValue('technicianId', '');
      setValidationSchema(baseSchema);
      return;
    }

    const loadServiceDetails = async () => {
      setIsServiceLoading(true);
      try {
        const serviceId = formik.values.serviceId;
        const [serviceData, techsRes] = await Promise.all([
          AdminControllers.getServiceByIdForAdmin(Number(serviceId)),
          AdminControllers.getTechniciansByService(Number(serviceId))
        ]);

        setTechnicians(Array.isArray(techsRes) ? techsRes : []);
        
        // Reset technician if not in the new list
        const techs = Array.isArray(techsRes) ? techsRes : [];
        if (formik.values.technicianId && !techs.find(t => t.id === Number(formik.values.technicianId))) {
          formik.setFieldValue('technicianId', '');
        }

        if (serviceData && serviceData.specifications) {
          const mappedFields: BookingFormField[] = serviceData.specifications.map((spec: any) => ({
            name: spec.name,
            label: spec.name,
            type: spec.type === 'image' ? 'file' : spec.type === 'select' ? 'select' : spec.type === 'number' ? 'number' : 'text',
            required: spec.isRequired,
            options: spec.values?.map((v: string) => ({ label: v, value: v })),
          }));
          
          setDynamicFields(mappedFields);

          // Build dynamic Yup schema
          const dynamicShape: Record<string, any> = {};
          mappedFields.forEach((field) => {
            if (field.required) {
              if (field.type === 'file' || field.type === 'multi-file') {
                dynamicShape[field.name] = yup.mixed().required(`${field.label} is required`);
              } else {
                dynamicShape[field.name] = yup.string().required(`${field.label} is required`);
              }
            }
          });
          setValidationSchema(baseSchema.shape(dynamicShape));

        } else {
          setDynamicFields([]);
          setValidationSchema(baseSchema);
        }
      } catch (err) {
        console.error('Failed to fetch service details or technicians', err);
        setTechnicians([]);
        setDynamicFields([]);
        setValidationSchema(baseSchema);
      } finally {
        setIsServiceLoading(false);
      }
    };

    loadServiceDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.serviceId]);

  const handleDynamicChange = (name: string, value: FieldValue) => {
    formik.setFieldValue(name, value);
  };

  const handleFileChange = (field: BookingFormField, files: File[]) => {
    formik.setFieldValue(field.name, files[0] || null);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '256px', borderRadius: 4, border: 1, borderColor: 'grey.200', bgcolor: 'background.paper', boxShadow: 1 }}>
        <CircularProgress color="warning" />
      </Box>
    );
  }

  return (
    <Card sx={{ borderRadius: 4, boxShadow: 1, border: 1, borderColor: 'grey.200' }}>
      <CardContent sx={{ p: 4 }}>
        {submitError && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {submitError}
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit} noValidate>
          
          {/* Step 1: Customer Selection */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, pb: 1, borderBottom: 1, borderColor: 'grey.100' }}>
              <User size={20} color="#94a3b8" />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }} color="text.primary">
                Customer Details
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl 
                  fullWidth 
                  required 
                  error={formik.touched.customerId && Boolean(formik.errors.customerId)}
                >
                  <InputLabel>Select Customer</InputLabel>
                  <Select
                    name="customerId"
                    value={formik.values.customerId}
                    label="Select Customer"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    MenuProps={{
                      slotProps: { paper: { sx: { maxHeight: 250 } } },
                      anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                      transformOrigin: { vertical: 'top', horizontal: 'left' },
                    }}
                  >
                    {customers.map((c) => (
                      <MenuItem key={c.id} value={c.id}>
                        {((c.firstName || '') + ' ' + (c.lastName || '')).trim() || c.username || 'Unknown Customer'}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.customerId && formik.errors.customerId && (
                    <FormHelperText>{String(formik.errors.customerId)}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl 
                  fullWidth 
                  required 
                  disabled={!formik.values.customerId}
                  error={formik.touched.addressId && Boolean(formik.errors.addressId)}
                >
                  <InputLabel>Select Address</InputLabel>
                  <Select
                    name="addressId"
                    value={formik.values.addressId}
                    label="Select Address"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    MenuProps={{
                      slotProps: { paper: { sx: { maxHeight: 250 } } },
                      anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                      transformOrigin: { vertical: 'top', horizontal: 'left' },
                    }}
                  >
                    {(() => {
                      const selectedCustomer = customers.find(c => c.id === Number(formik.values.customerId));
                      const addresses = selectedCustomer?.addresses || [];
                      return addresses.map((a: any) => (
                        <MenuItem key={a.id} value={a.id}>
                          {a.label ? `${a.label} - ` : ''}{a.fullAddress || a.city || 'No Address provided'}
                        </MenuItem>
                      ));
                    })()}
                  </Select>
                  {formik.touched.addressId && formik.errors.addressId && (
                    <FormHelperText>{String(formik.errors.addressId)}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          {/* Step 2: Service Selection */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, pb: 1, borderBottom: 1, borderColor: 'grey.100' }}>
              <Wrench size={20} color="#94a3b8" />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }} color="text.primary">
                Service Details
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl 
                  fullWidth 
                  required 
                  error={formik.touched.serviceId && Boolean(formik.errors.serviceId)}
                >
                  <InputLabel>Select Service</InputLabel>
                  <Select
                    name="serviceId"
                    value={formik.values.serviceId}
                    label="Select Service"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    MenuProps={{
                      slotProps: { paper: { sx: { maxHeight: 250 } } },
                      anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                      transformOrigin: { vertical: 'top', horizontal: 'left' },
                    }}
                  >
                    {services.map((s: any) => {
                      const id = s.serviceId || s.id;
                      const name = s.serviceName || s.name || 'Unnamed Service';
                      return <MenuItem key={id} value={id}>{name}</MenuItem>;
                    })}
                  </Select>
                  {formik.touched.serviceId && formik.errors.serviceId && (
                    <FormHelperText>{String(formik.errors.serviceId)}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl 
                  fullWidth 
                  required 
                  disabled={!formik.values.serviceId || isServiceLoading}
                  error={formik.touched.technicianId && Boolean(formik.errors.technicianId)}
                >
                  <InputLabel>Select Technician</InputLabel>
                  <Select
                    name="technicianId"
                    value={formik.values.technicianId}
                    label="Select Technician"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    MenuProps={{
                      slotProps: { paper: { sx: { maxHeight: 250 } } },
                      anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                      transformOrigin: { vertical: 'top', horizontal: 'left' },
                    }}
                  >
                    {technicians.map((t) => (
                      <MenuItem key={t.id} value={t.id}>
                        {((t.firstName || '') + ' ' + (t.lastName || '')).trim() || t.username || 'Unknown Technician'}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.values.serviceId && technicians.length === 0 && !isServiceLoading && (
                    <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                      No approved technicians found for this service.
                    </Typography>
                  )}
                  {formik.touched.technicianId && formik.errors.technicianId && (
                    <FormHelperText>{String(formik.errors.technicianId)}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          {/* Step 3: Schedule */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, pb: 1, borderBottom: 1, borderColor: 'grey.100' }}>
              <Calendar size={20} color="#94a3b8" />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }} color="text.primary">
                Schedule
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  name="scheduledAt"
                  type="datetime-local"
                  label="Scheduled At"
                  slotProps={{ inputLabel: { shrink: true } }}
                  value={formik.values.scheduledAt}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.scheduledAt && Boolean(formik.errors.scheduledAt)}
                  helperText={formik.touched.scheduledAt && String(formik.errors.scheduledAt || '')}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Step 4: Dynamic Fields */}
          {isServiceLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress size={30} color="warning" />
            </Box>
          ) : dynamicFields.length > 0 ? (
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, pb: 1, borderBottom: 1, borderColor: 'grey.100' }}>
                <AlertCircle size={20} color="#94a3b8" />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }} color="text.primary">
                  Service Specifications
                </Typography>
              </Box>
              <AdminDynamicBookingFields
                fields={dynamicFields}
                values={formik.values}
                onChange={handleDynamicChange}
                onFileChange={handleFileChange}
                errors={(formik.submitCount > 0 || Object.keys(formik.touched).length > 0) ? (formik.errors as Record<string, string>) : {}}
              />
            </Box>
          ) : null}

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              color="warning"
              disabled={formik.isSubmitting}
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 'bold',
                borderRadius: 3,
                textTransform: 'none',
              }}
            >
              {formik.isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Create Booking'}
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
}
