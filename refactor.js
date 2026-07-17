const fs = require('fs');
const path = require('path');

const mappings = [
  // auth.service.ts
  { old: 'loginService', newModule: '@/api/authControllers', newObj: 'AuthControllers', newFunc: 'login' },
  { old: 'forgotPasswordService', newModule: '@/api/authControllers', newObj: 'AuthControllers', newFunc: 'forgotPassword' },
  { old: 'resetPasswordService', newModule: '@/api/authControllers', newObj: 'AuthControllers', newFunc: 'resetPassword' },
  { old: 'generateOtpService', newModule: '@/api/authControllers', newObj: 'AuthControllers', newFunc: 'generateOtp' },
  { old: 'verifyOtpService', newModule: '@/api/authControllers', newObj: 'AuthControllers', newFunc: 'verifyOtp' },
  { old: 'registerCustomerService', newModule: '@/api/authControllers', newObj: 'AuthControllers', newFunc: 'registerCustomer' },
  { old: 'registerTechnicianService', newModule: '@/api/authControllers', newObj: 'AuthControllers', newFunc: 'registerTechnician' },
  { old: 'getProfileService', newModule: '@/api/authControllers', newObj: 'AuthControllers', newFunc: 'getProfile' },

  // customer.service.ts
  { old: 'getCustomerProfileService', newModule: '@/api/customerControllers', newObj: 'CustomerControllers', newFunc: 'getCustomerProfile' },
  { old: 'updateCustomerProfileService', newModule: '@/api/customerControllers', newObj: 'CustomerControllers', newFunc: 'updateCustomerProfile' },
  { old: 'createAddressService', newModule: '@/api/customerControllers', newObj: 'CustomerControllers', newFunc: 'createAddress' },
  { old: 'getCustomerAddressesService', newModule: '@/api/customerControllers', newObj: 'CustomerControllers', newFunc: 'getCustomerAddresses' },
  { old: 'updateAddressService', newModule: '@/api/customerControllers', newObj: 'CustomerControllers', newFunc: 'updateAddress' },
  { old: 'deleteAddressService', newModule: '@/api/customerControllers', newObj: 'CustomerControllers', newFunc: 'deleteAddress' },

  // admin.service.ts & profile.service.ts
  { old: 'getAdminComplaintByIdService', newModule: '@/api/adminControllers', newObj: 'AdminControllers', newFunc: 'getAdminComplaintById' },
  { old: 'getAdminComplaintsService', newModule: '@/api/adminControllers', newObj: 'AdminControllers', newFunc: 'getAdminComplaints' },
  { old: 'deleteComplaintsService', newModule: '@/api/adminControllers', newObj: 'AdminControllers', newFunc: 'deleteComplaint' },
  { old: 'resolveAdminComplaintService', newModule: '@/api/adminControllers', newObj: 'AdminControllers', newFunc: 'resolveAdminComplaint' },
  { old: 'getAdminBookingsService', newModule: '@/api/adminControllers', newObj: 'AdminControllers', newFunc: 'getAdminBookings' },
  { old: 'updateProfile', newModule: '@/api/adminControllers', newObj: 'AdminControllers', newFunc: 'updateProfile' },

  // booking.service.ts & customerBooking.service.ts
  { old: 'createBookingService', newModule: '@/api/bookingControllers', newObj: 'BookingControllers', newFunc: 'createBooking' },
  { old: 'cancelBookingService', newModule: '@/api/bookingControllers', newObj: 'BookingControllers', newFunc: 'cancelBooking' },
  { old: 'rescheduleBookingService', newModule: '@/api/bookingControllers', newObj: 'BookingControllers', newFunc: 'rescheduleBooking' },
  { old: 'getCustomerBookingsService', newModule: '@/api/bookingControllers', newObj: 'BookingControllers', newFunc: 'getCustomerBookings' },

  // service.service.ts
  { old: 'getAllServicesService', newModule: '@/api/serviceControllers', newObj: 'ServiceControllers', newFunc: 'getAllServices' },
  { old: 'getServiceByIdService', newModule: '@/api/serviceControllers', newObj: 'ServiceControllers', newFunc: 'getServiceById' },
  { old: 'createServiceService', newModule: '@/api/serviceControllers', newObj: 'ServiceControllers', newFunc: 'createService' },
  { old: 'updateServiceApiCall', newModule: '@/api/serviceControllers', newObj: 'ServiceControllers', newFunc: 'updateService' },
  { old: 'deleteServiceApiCall', newModule: '@/api/serviceControllers', newObj: 'ServiceControllers', newFunc: 'deleteService' },

  // complaint.service.ts
  { old: 'createComplaintService', newModule: '@/api/complaintControllers', newObj: 'ComplaintControllers', newFunc: 'createComplaint' },
  { old: 'updateComplaintService', newModule: '@/api/complaintControllers', newObj: 'ComplaintControllers', newFunc: 'updateComplaint' },

  // technician.service.ts
  { old: 'getTechnicianProfileService', newModule: '@/api/technicianControllers', newObj: 'TechnicianControllers', newFunc: 'getTechnicianProfile' },

  // favouriteTechnician.service.ts
  { old: 'getFavouriteTechniciansService', newModule: '@/api/favouriteTechnicianControllers', newObj: 'FavouriteTechnicianControllers', newFunc: 'getFavouriteTechnicians' },

  // tokenPayment.service.ts
  { old: 'createTokenPaymentLinkService', newModule: '@/api/tokenPaymentControllers', newObj: 'TokenPaymentControllers', newFunc: 'createTokenPaymentLink' },

  // customerDashboard.service.ts
  { old: 'customerDashboardService', newModule: '@/api/customerDashboardControllers', newObj: 'CustomerDashboardControllers', newFunc: 'CustomerDashboardControllers' },
];

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('.next') && !file.includes('.git') && !file.includes('services')) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('d:/digixito-projects/chandra-FE');
let changedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  // Track which new controllers we need to import
  const requiredControllers = new Set();
  
  mappings.forEach(m => {
    if (m.old === 'customerDashboardService') {
       // specific handling for customerDashboardService since it was exported as an object
       if (content.includes('customerDashboardService.')) {
         content = content.replace(/customerDashboardService\./g, 'CustomerDashboardControllers.');
         requiredControllers.add(m);
       }
       if (content.includes(`import { customerDashboardService }`)) {
           content = content.replace(/import\s*{\s*customerDashboardService\s*}\s*from\s*['"](.*?)['"];?/, '');
       }
       return;
    }

    // Check if the old function is used
    const regexOldCall = new RegExp(`\\b${m.old}\\s*\\(`, 'g');
    if (regexOldCall.test(content) || content.includes(` ${m.old} `) || content.includes(` ${m.old},`) || content.includes(` ${m.old}\n`)) {
      // Replace the call: oldService(...) -> NewController.newFunc(...)
      // Note: This won't cover if it's passed as a reference, but we can try to just replace the word
      content = content.replace(new RegExp(`\\b${m.old}\\b`, 'g'), `${m.newObj}.${m.newFunc}`);
      requiredControllers.add(m);
    }
    
    // Remove old import
    const importRegex = new RegExp(`import\\s*{([^}]*)\\b${m.old}\\b([^}]*)}\\s*from\\s*['"]@/services/[^'"]+['"];?`, 'g');
    content = content.replace(importRegex, (match, before, after) => {
        let newBeforeAfter = (before + after).replace(/,\s*,/g, ',').replace(/^,\s*/, '').replace(/,\s*$/, '');
        if (newBeforeAfter.trim() === '') return '';
        return `import { ${newBeforeAfter.trim()} } from match_extract_placeholder`; // Handled later if multiple imports
    });
  });

  // Clean up empty imports from services
  content = content.replace(/import\s*{\s*}\s*from\s*['"]@\/services\/.*?['"];?\n?/g, '');
  // Remove any remaining full imports from services that weren't captured (if we deleted all functions from it)
  // Actually it's safer to just let ESLint handle unused imports, or we can just append the new ones.

  // Add new imports
  const moduleImports = {};
  requiredControllers.forEach(m => {
    if (!moduleImports[m.newModule]) moduleImports[m.newModule] = new Set();
    moduleImports[m.newModule].add(m.newObj);
  });

  let importStrings = '';
  for (const [modulePath, objs] of Object.entries(moduleImports)) {
     // Check if it's already imported
     const objsArr = Array.from(objs);
     if (!content.includes(`from '${modulePath}'`) && !content.includes(`from "${modulePath}"`)) {
        importStrings += `import { ${objsArr.join(', ')} } from '${modulePath}';\n`;
     }
  }

  if (importStrings) {
    // Add imports after the last import, or at the top
    const lastImportIndex = content.lastIndexOf('import ');
    if (lastImportIndex !== -1) {
       const endOfLastImport = content.indexOf('\\n', lastImportIndex);
       if(endOfLastImport !== -1) {
           content = content.slice(0, endOfLastImport + 1) + importStrings + content.slice(endOfLastImport + 1);
       } else {
           content = importStrings + content;
       }
    } else {
       content = importStrings + content;
    }
  }

  if (content !== originalContent) {
    // Remove any leftover 'import {  } from '@/services/...''
    content = content.replace(/import\s*{\s*}\s*from\s*['"]@\/services\/[^'"]+['"];?\n?/g, '');
    content = content.replace(/import\s*{\s*,\s*}\s*from\s*['"]@\/services\/[^'"]+['"];?\n?/g, '');
    fs.writeFileSync(file, content, 'utf8');
    changedCount++;
  }
});

console.log('Modified ' + changedCount + ' files.');
