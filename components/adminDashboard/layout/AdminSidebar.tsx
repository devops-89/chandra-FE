"use client";

import {
  Box,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography} from "@mui/material";
import { ChevronDown, ChevronRight, LogOut, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";

import { adminSidebarItems } from "@/constants/admin/adminSidebar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logoutUser } from "@/redux/slices/authSlice";
import type { User } from "@/types/auth.types";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const DRAWER_WIDTH = 288; // 72 * 4 = 288px

const SidebarContent = ({ onLinkClick }: { onLinkClick?: () => void }) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const reduxUser = useAppSelector((state) => state.auth.user);
  
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    "/admin/finance": pathname.startsWith("/admin/finance"),
  });
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (reduxUser) {
      const id = setTimeout(() => setUser(reduxUser), 0);
      return () => clearTimeout(id);
    }
    try {
      const str = localStorage.getItem('user');
      if (str) {
        const parsed = JSON.parse(str);
        const id = setTimeout(() => setUser(parsed), 0);
        return () => clearTimeout(id);
      }
    } catch {
      // ignore
    }
  }, [reduxUser]);

  const firstName = user?.firstName ?? 'Admin';
  const lastName  = user?.lastName  ?? '';
  const initials  = `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase() || 'A';
  const fullName  = `${firstName}${lastName ? ' ' + lastName[0] + '.' : ''}`.trim();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleProfileClose();
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
                                  py: 1,
                                  px: 2,
                                  mb: 0.5,
                                  backgroundColor: childActive ? '#10b981' : 'transparent',
                                  color: childActive ? '#ffffff' : '#64748b',
                                  boxShadow: childActive ? '0 4px 14px rgba(16, 185, 129, 0.2)' : 'none',
                                  '&:hover': {
                                    backgroundColor: childActive ? '#059669' : '#ecfdf5',
                                    color: childActive ? '#ffffff' : '#047857',
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

      <Box sx={{ p: 2, borderTop: '1px solid #e2e8f0' }}>
        <Box 
          onClick={handleProfileClick}
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1.5, 
            px: 1, 
            py: 1,
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            '&:hover': {
              backgroundColor: '#f1f5f9'
            }
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              width: 40, 
              height: 40, 
              borderRadius: '50%', 
              backgroundColor: '#059669', 
              color: 'white', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontWeight: 600,
              fontSize: '1rem',
              flexShrink: 0
            }}
          >
            {initials}
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#1e293b' }} noWrap>
              {fullName}
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: '#64748b' }}>
              Admin
            </Typography>
          </Box>
          <ChevronRight size={18} className="text-slate-400" />
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleProfileClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          sx={{
            '& .MuiPaper-root': {
              borderRadius: '12px',
              mt: -1,
              width: anchorEl ? anchorEl.clientWidth : 240,
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
              border: '1px solid #e2e8f0'
            }
          }}
        >
          <MenuItem 
            onClick={handleLogout}
            sx={{ 
              color: '#dc2626',
              fontWeight: 500,
              fontSize: '0.95rem',
              display: 'flex',
              gap: 1.5,
              py: 1.5
            }}
          >
            <LogOut size={18} />
            Logout
          </MenuItem>
        </Menu>
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