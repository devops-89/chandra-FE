"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, LogOut, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  Box,
  Divider,
  IconButton,
} from "@mui/material";

import { adminSidebarItems } from "@/constants/admin/adminSidebar";
import { useAppDispatch } from "@/redux/hooks";
import { logoutUser } from "@/redux/slices/authSlice";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const DRAWER_WIDTH = 288; // 72 * 4 = 288px

const SidebarContent = ({ onLinkClick }: { onLinkClick?: () => void }) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    "/admin/finance": pathname.startsWith("/admin/finance"),
  });

  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.push('/');
  };

  const toggleExpand = (href: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [href]: !prev[href],
    }));
  };

  return (
    <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
        <List sx={{ p: 0, '& .MuiListItemButton-root': { mb: 0.5, borderRadius: '12px' } }}>
          {adminSidebarItems.map((item) => {
            const Icon = item.icon;
            const hasChildren = !!item.children && item.children.length > 0;

            const isExactActive = pathname === item.href;
            const isChildActive = hasChildren && pathname.startsWith(item.href);
            const active = isExactActive || isChildActive;
            const isExpanded = !!expandedItems[item.href];

            return (
              <Box key={item.href}>
                {hasChildren ? (
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => toggleExpand(item.href)}
                      sx={{
                        backgroundColor: active ? '#d1fae5' : 'transparent',
                        color: active ? '#047857' : '#475569',
                        '&:hover': {
                          backgroundColor: active ? '#d1fae5' : '#ecfdf5',
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                        <Icon size={18} />
                      </ListItemIcon>
                      <ListItemText 
                        disableTypography 
                        primary={
                          <Typography sx={{ fontWeight: active ? 600 : 500, fontSize: '0.95rem' }}>
                            {item.label}
                          </Typography>
                        } 
                      />
                      {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </ListItemButton>
                  </ListItem>
                ) : (
                  <ListItem disablePadding>
                    <ListItemButton
                      component={Link}
                      href={item.href}
                      onClick={onLinkClick}
                      sx={{
                        backgroundColor: active ? '#d1fae5' : 'transparent',
                        color: active ? '#047857' : '#475569',
                        '&:hover': {
                          backgroundColor: active ? '#d1fae5' : '#ecfdf5',
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                        <Icon size={18} />
                      </ListItemIcon>
                      <ListItemText 
                        disableTypography 
                        primary={
                          <Typography sx={{ fontWeight: active ? 600 : 500, fontSize: '0.95rem' }}>
                            {item.label}
                          </Typography>
                        } 
                      />
                    </ListItemButton>
                  </ListItem>
                )}

                {hasChildren && (
                  <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding sx={{ pl: 2.5, mt: 0.5, mb: 1 }}>
                      <Box sx={{ borderLeft: '2px solid #d1fae5', pl: 1 }}>
                        {item.children?.map((child) => {
                          const childActive = pathname === child.href;
                          return (
                            <ListItem key={child.href} disablePadding>
                              <ListItemButton
                                component={Link}
                                href={child.href}
                                onClick={onLinkClick}
                                sx={{
                                  borderRadius: '8px',
                                  py: 0.75,
                                  mb: 0.5,
                                  backgroundColor: childActive ? '#ecfdf5' : 'transparent',
                                  color: childActive ? '#047857' : '#64748b',
                                  '&:hover': {
                                    backgroundColor: '#ecfdf5',
                                    color: '#047857',
                                  },
                                }}
                              >
                                <ListItemText 
                                  disableTypography 
                                  primary={
                                    <Typography sx={{ fontWeight: childActive ? 600 : 400, fontSize: '0.875rem' }}>
                                      {child.label}
                                    </Typography>
                                  } 
                                />
                              </ListItemButton>
                            </ListItem>
                          );
                        })}
                      </Box>
                    </List>
                  </Collapse>
                )}
              </Box>
            );
          })}
        </List>
      </Box>

      <Box sx={{ p: 2 }}>
        <List sx={{ p: 0 }}>
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                borderRadius: '12px',
                color: '#dc2626',
                '&:hover': {
                  backgroundColor: '#fef2f2',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                <LogOut size={20} />
              </ListItemIcon>
              <ListItemText 
                disableTypography 
                primary={
                  <Typography sx={{ fontWeight: 500, fontSize: '0.95rem' }}>
                    Logout
                  </Typography>
                } 
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

const AdminSidebar = ({ isOpen, onClose }: AdminSidebarProps) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', lg: 'block' },
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            borderRight: '1px solid #e2e8f0',
            backgroundColor: '#ffffff',
          },
        }}
      >
        <Box sx={{ height: 80, px: 2.5, display: 'flex', flexDirection: 'column', justifyContent: 'center', borderBottom: '1px solid #e2e8f0' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#059669', lineHeight: 1.2 }}>
            HiChandra
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b' }}>
            Admin Portal
          </Typography>
        </Box>
        <SidebarContent />
      </Drawer>

      {/* Mobile Sidebar Drawer */}
      <Drawer
        variant="temporary"
        open={isOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: DRAWER_WIDTH,
            maxWidth: '85vw',
            backgroundColor: '#ffffff',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, py: 3, borderBottom: '1px solid #e2e8f0' }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#047857', lineHeight: 1.2 }}>
              HiChandra
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b' }}>
              Admin Portal
            </Typography>
          </Box>
          <IconButton onClick={onClose} sx={{ color: '#047857', '&:hover': { backgroundColor: '#d1fae5' } }}>
            <X size={24} />
          </IconButton>
        </Box>
        <SidebarContent onLinkClick={onClose} />
      </Drawer>
    </>
  );
};

export default AdminSidebar;