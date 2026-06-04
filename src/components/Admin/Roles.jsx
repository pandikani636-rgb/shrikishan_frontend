import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import Swal from 'sweetalert2';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Button,
    Card,
    CardContent,
    Typography,
    TablePagination,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    TextField,
    InputAdornment
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import MetaData from '../Layouts/MetaData';

import { useDispatch, useSelector } from "react-redux";
import { getAllRoles, deleteRole, createRole, updateRole } from "../../actions/rolesActions";
import { DELETE_ROLE_RESET, NEW_ROLE_RESET, UPDATE_ROLE_RESET } from "../../constants/rolesConstants";

const Roles = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal states
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);

    // Form states
    const [roleForm, setRoleForm] = useState({ name: '' });
    const [validation, setValidation] = useState({});

    const { roles, loading, error } = useSelector((state) => state.roles);
    const { isDeleted, error: deleteError } = useSelector((state) => state.deleteRole);
    const { success: createSuccess, error: createError } = useSelector((state) => state.newRole);
    const { isUpdated, error: updateError } = useSelector((state) => state.updateRole);

    const filteredRoles = (roles || []).filter((role) => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return true;
        return String(role.name || '').toLowerCase().includes(term);
    });

    useEffect(() => {
        if (error) {
            Swal.fire({ title: "Failed!", text: error, icon: "error", timer: 2000 });
        }

        if (deleteError) {
            Swal.fire({ title: "Failed!", text: deleteError, icon: "error", timer: 2000 });
        }

        if (isDeleted) {
            Swal.fire({ title: "Success!", text: "Role deleted successfully!", icon: "success", timer: 2000 });
            dispatch({ type: DELETE_ROLE_RESET });
            dispatch(getAllRoles());
        }

        if (createSuccess) {
            Swal.fire({ title: "Success!", text: "Role created successfully!", icon: "success", timer: 2000 });
            dispatch({ type: NEW_ROLE_RESET });
            dispatch(getAllRoles());
            handleCloseAddModal();
        }

        if (createError) {
            Swal.fire({ title: "Failed!", text: createError, icon: "error", timer: 2000 });
        }

        if (isUpdated) {
            Swal.fire({ title: "Success!", text: "Role updated successfully!", icon: "success", timer: 2000 });
            dispatch({ type: UPDATE_ROLE_RESET });
            dispatch(getAllRoles());
            handleCloseEditModal();
        }

        if (updateError) {
            Swal.fire({ title: "Failed!", text: updateError, icon: "error", timer: 2000 });
        }

        dispatch(getAllRoles());
    }, [dispatch, error, deleteError, isDeleted, createSuccess, createError, isUpdated, updateError]);

    const handleOpenAddModal = () => {
        setRoleForm({ name: '' });
        setValidation({});
        setOpenAddModal(true);
    };

    const handleCloseAddModal = () => {
        setOpenAddModal(false);
        setRoleForm({ name: '' });
        setValidation({});
    };

    const handleOpenEditModal = (role) => {
        setSelectedRole(role);
        setRoleForm({ name: role.name || '' });
        setValidation({});
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setSelectedRole(null);
        setRoleForm({ name: '' });
        setValidation({});
    };

    const validateForm = () => {
        const errors = {};
        if (!roleForm.name.trim()) {
            errors.name = "Role name is required";
        }
        setValidation(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        dispatch(createRole({ name: roleForm.name }));
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        dispatch(updateRole(selectedRole._id, { name: roleForm.name }));
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3b82f6",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
            customClass: {
                confirmButton: 'swal-confirm-btn',
                cancelButton: 'swal-cancel-btn'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteRole(id));
            }
        });
    };

    return (
        <Box sx={{ minHeight: '100vh', py: 4 }}>
            <MetaData title="Roles | Shree Kishan Aayushi" />

            <Box sx={{ mb: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Box>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-1 bg-blue-600 rounded-full"></div>
                        <p className="text-[10px] font-black text-blue-900/40 uppercase tracking-[0.3em]">Management</p>
                    </div>
                    <Typography variant="h4" sx={{ fontWeight: 950, color: '#020617', letterSpacing: '-0.03em', textTransform: 'uppercase' }}>
                        All <span style={{ color: '#0f52ba' }}>Roles</span>
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                    <div className="relative group">
                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300 text-sm group-focus-within:text-blue-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search Role..."
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
                            className="pl-11 pr-6 py-3.5 bg-white border border-slate-100 rounded-[20px] text-[11px] font-black uppercase tracking-widest text-slate-950 outline-none w-64 shadow-sm hover:border-blue-100 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all"
                        />
                    </div>

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleOpenAddModal}
                        sx={{
                            borderRadius: '20px',
                            textTransform: 'uppercase',
                            fontWeight: 900,
                            letterSpacing: '0.1em',
                            fontSize: '11px',
                            px: 4,
                            py: 2,
                            background: '#0f52ba',
                            boxShadow: '0 15px 30px rgba(15, 82, 186, 0.15)',
                            '&:hover': { background: '#083d8d', transform: 'translateY(-2px)' },
                            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                    >
                        Add Role
                    </Button>
                </Box>
            </Box>

            <Card sx={{
                borderRadius: '35px',
                boxShadow: '0 40px 100px rgba(15, 82, 186, 0.04)',
                border: '1px solid #f1f5f9',
                background: '#ffffff',
                overflow: 'hidden'
            }}>
                <CardContent sx={{ p: 0 }}>
                    <TableContainer sx={{ maxHeight: 'calc(100vh - 350px)' }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {[
                                        { label: 'S.No', width: '80px' },
                                        { label: 'Role Name', width: 'auto' },
                                        { label: 'Actions', width: '120px' }
                                    ].map((head, i) => (
                                        <TableCell
                                            key={i}
                                            align={i === 0 || i === 2 ? "center" : "left"}
                                            sx={{
                                                fontWeight: 950,
                                                color: 'rgba(2, 6, 23, 0.3)',
                                                fontSize: '10px',
                                                py: 4,
                                                bgcolor: '#f8fafc',
                                                borderBottom: '1px solid #f1f5f9',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.15em',
                                                width: head.width
                                            }}
                                        >
                                            {head.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={3} align="center" sx={{ py: 12 }}>
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                                                <Typography sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '10px', color: 'rgba(2, 6, 23, 0.3)' }}>Loading...</Typography>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : filteredRoles?.length > 0 ? (
                                    filteredRoles
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((role, index) => (
                                            <TableRow
                                                key={role._id}
                                                sx={{
                                                    transition: 'all 0.4s ease',
                                                    '&:hover': { background: '#f0f7ff' },
                                                    '& td': { borderBottom: '1px solid #f8fafc', py: 3 }
                                                }}
                                            >
                                                <TableCell align="center">
                                                    <Typography sx={{ fontSize: '11px', color: 'rgba(2, 6, 23, 0.2)', fontWeight: 900 }}>
                                                        {((page * rowsPerPage) + index + 1).toString().padStart(2, '0')}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Typography sx={{ fontSize: '13px', color: '#020617', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
                                                        {role.name}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5 }}>
                                                        <IconButton
                                                            onClick={() => handleOpenEditModal(role)}
                                                            sx={{
                                                                color: '#0f52ba',
                                                                background: '#f0f7ff',
                                                                borderRadius: '12px',
                                                                '&:hover': { background: '#0f52ba', color: '#fff' },
                                                                transition: 'all 0.3s ease'
                                                            }}
                                                        >
                                                            <EditIcon sx={{ fontSize: 18 }} />
                                                        </IconButton>
                                                        <IconButton
                                                            onClick={() => handleDelete(role._id)}
                                                            sx={{
                                                                color: '#ef4444',
                                                                background: '#fef2f2',
                                                                borderRadius: '12px',
                                                                '&:hover': { background: '#ef4444', color: '#fff' },
                                                                transition: 'all 0.3s ease'
                                                            }}
                                                        >
                                                            <DeleteIcon sx={{ fontSize: 18 }} />
                                                        </IconButton>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} align="center" sx={{ py: 12 }}>
                                            <div className="flex flex-col items-center gap-4 opacity-20">
                                                <div className="w-16 h-16 rounded-full bg-slate-200"></div>
                                                <Typography sx={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '11px' }}>No Roles Found</Typography>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        component="div"
                        count={filteredRoles?.length || 0}
                        page={page}
                        onPageChange={(e, newPage) => setPage(newPage)}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={(e) => {
                            setRowsPerPage(parseInt(e.target.value, 10));
                            setPage(0);
                        }}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        sx={{
                            borderTop: '1px solid #f1f5f9',
                            px: 4,
                            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                fontSize: '10px',
                                color: 'rgba(2, 6, 23, 0.3)',
                                letterSpacing: '0.1em'
                            }
                        }}
                    />
                </CardContent>
            </Card>

            {/* Add/Edit Modal */}
            <Dialog
                open={openAddModal || openEditModal}
                onClose={openAddModal ? handleCloseAddModal : handleCloseEditModal}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: '40px',
                        boxShadow: '0 50px 100px rgba(15, 82, 186, 0.15)',
                        border: '1px solid #f1f5f9'
                    }
                }}
            >
                <DialogTitle sx={{ p: 6, pb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-1 bg-blue-600 rounded-full"></div>
                                <p className="text-[9px] font-black text-blue-900/40 uppercase tracking-[0.2em]">{openAddModal ? 'New' : 'Update'} Role</p>
                            </div>
                            <Typography variant="h5" sx={{ fontWeight: 950, color: '#020617', textTransform: 'uppercase' }}>
                                {openAddModal ? 'Add' : 'Edit'} <span style={{ color: '#0f52ba' }}>Role</span>
                            </Typography>
                        </Box>
                        <IconButton onClick={openAddModal ? handleCloseAddModal : handleCloseEditModal}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent sx={{ px: 6, py: 4 }}>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-blue-900/30 uppercase tracking-widest ml-1">Role Name</label>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="e.g., Admin, Manager, Staff"
                                value={roleForm.name}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setRoleForm({ ...roleForm, name: val });
                                    if (val.trim() && validation.name) {
                                        const newValidation = { ...validation };
                                        delete newValidation.name;
                                        setValidation(newValidation);
                                    }
                                }}
                                error={Boolean(validation.name)}
                                helperText={validation.name}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px', bgcolor: '#f8fafc' } }}
                            />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions sx={{ px: 6, py: 6, gap: 2 }}>
                    <Button onClick={openAddModal ? handleCloseAddModal : handleCloseEditModal} sx={{ borderRadius: '15px', color: '#94a3b8', fontWeight: 900, fontSize: '11px' }}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={openAddModal ? handleAddSubmit : handleEditSubmit}
                        sx={{ borderRadius: '15px', bgcolor: '#0f52ba', fontWeight: 900, fontSize: '11px', px: 6, py: 1.5, boxShadow: '0 10px 20px rgba(15,82,186,0.2)' }}
                    >
                        {openAddModal ? 'Add Role' : 'Update Role'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Roles;
