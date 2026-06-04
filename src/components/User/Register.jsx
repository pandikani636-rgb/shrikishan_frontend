import { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select,
  FormHelperText
} from "@mui/material";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, registerUser } from "../../actions/userAction";
import { getAllRoles } from "../../actions/rolesActions";
import BackdropLoader from "../Layouts/BackdropLoader";
import MetaData from "../Layouts/MetaData";
import Swal from "sweetalert2";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { loading, isAuthenticated, error, user: currentUser } = useSelector(
    (state) => state.user
  );

  const { roles = [], loading: roleLoading } = useSelector(
    (state) => state.roles || {}
  );

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    role: "",
    password: "",
    cpassword: "",
    // Doctor-specific fields
    registrationNumber: "",
    medicalCouncil: "",
    qualification: "",
    specialization: "",
    experience: "",
    clinicName: "",
    clinicAddress: "",
    city: "",
    state: "",
    pincode: "",
    registrationCertificate: null,
    doctorIdProof: null,
    profilePhoto: null
  });

  const [errors, setErrors] = useState({});
  const [avatarPreview, setAvatarPreview] = useState("/profile.png");
  const [resume, setResume] = useState(""); // treating as cert preview/name if needed
  const [idProof, setIdProof] = useState("");

  const validate = (fieldName, value) => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case 'name':
        if (!value.trim()) newErrors.name = "Full Name is required";
        else delete newErrors.name;
        break;
      case 'email':
        if (!value.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(value)) newErrors.email = "Email is invalid";
        else delete newErrors.email;
        break;
      case 'phone':
        if (!value.trim()) newErrors.phone = "Phone Number is required";
        else if (!/^\d{10}$/.test(value)) newErrors.phone = "Phone Number must be 10 digits";
        else delete newErrors.phone;
        break;
      case 'gender':
        if (!value) newErrors.gender = "Gender is required";
        else delete newErrors.gender;
        break;
      case 'address':
        if (!value.trim()) newErrors.address = "Address is required";
        else delete newErrors.address;
        break;
      case 'role':
        if (!value) newErrors.role = "Role is required";
        else delete newErrors.role;
        break;
      case 'password':
        if (!value) newErrors.password = "Password is required";
        else if (value.length < 8) newErrors.password = "Password must be at least 8 characters";
        else delete newErrors.password;
        // Check confirm password match if password changes
        if (user.cpassword && value !== user.cpassword) newErrors.cpassword = "Passwords do not match";
        else if (user.cpassword && value === user.cpassword) delete newErrors.cpassword;
        break;
      case 'cpassword':
        if (!value) newErrors.cpassword = "Confirm Password is required";
        else if (value !== user.password) newErrors.cpassword = "Passwords do not match";
        else delete newErrors.cpassword;
        break;
      // Doctor fields
      case 'registrationNumber':
        if (!value.trim()) newErrors.registrationNumber = "Registration Number is required";
        else delete newErrors.registrationNumber;
        break;
      case 'medicalCouncil':
        if (!value.trim()) newErrors.medicalCouncil = "Medical Council is required";
        else delete newErrors.medicalCouncil;
        break;
      case 'qualification':
        if (!value.trim()) newErrors.qualification = "Qualification is required";
        else delete newErrors.qualification;
        break;
      case 'specialization':
        if (!value.trim()) newErrors.specialization = "Specialization is required";
        else delete newErrors.specialization;
        break;
      case 'experience':
        if (!value) newErrors.experience = "Experience is required";
        else delete newErrors.experience;
        break;
      case 'clinicName':
        if (!value.trim()) newErrors.clinicName = "Clinic Name is required";
        else delete newErrors.clinicName;
        break;
      case 'city':
        if (!value.trim()) newErrors.city = "City is required";
        else delete newErrors.city;
        break;
      case 'state':
        if (!value.trim()) newErrors.state = "State is required";
        else delete newErrors.state;
        break;
      case 'clinicAddress':
        if (!value.trim()) newErrors.clinicAddress = "Clinic Address is required";
        else delete newErrors.clinicAddress;
        break;
    }
    return newErrors;
  };

  // Validate entire form on submit
  const validateForm = () => {
    const newErrors = {};
    if (!user.name.trim()) newErrors.name = "Full Name is required";
    if (!user.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(user.email)) newErrors.email = "Email is invalid";
    if (!user.phone.trim()) newErrors.phone = "Phone Number is required";
    else if (!/^\d{10}$/.test(user.phone)) newErrors.phone = "Phone Number must be 10 digits";
    if (!user.gender) newErrors.gender = "Gender is required";
    if (!user.address.trim()) newErrors.address = "Address is required";
    if (!user.role) newErrors.role = "Role is required";
    if (!user.password) newErrors.password = "Password is required";
    else if (user.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (!user.cpassword) newErrors.cpassword = "Confirm Password is required";
    else if (user.password !== user.cpassword) newErrors.cpassword = "Passwords do not match";

    if (user.role && user.role.toLowerCase().includes("doctor")) {
      if (!user.registrationNumber) newErrors.registrationNumber = "Registration Number is required";
      if (!user.medicalCouncil) newErrors.medicalCouncil = "Medical Council is required";
      if (!user.qualification) newErrors.qualification = "Qualification is required";
      if (!user.specialization) newErrors.specialization = "Specialization is required";
      if (!user.experience) newErrors.experience = "Experience is required";
      if (!user.clinicName) newErrors.clinicName = "Clinic Name is required";
      if (!user.city) newErrors.city = "City is required";
      if (!user.state) newErrors.state = "State is required";
      if (!user.clinicAddress) newErrors.clinicAddress = "Clinic Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleDataChange = (e) => {
    if (e.target.name === "profilePhoto") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setUser({ ...user, profilePhoto: e.target.files[0] });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else if (e.target.name === "registrationCertificate") {
      setUser({ ...user, registrationCertificate: e.target.files[0] });
      setResume(e.target.files[0].name);
    } else if (e.target.name === "doctorIdProof") {
      setUser({ ...user, doctorIdProof: e.target.files[0] });
      setIdProof(e.target.files[0].name);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
      // Real-time validation: Clear error when valid, set when invalid if touched logic desired, 
      // but requirement says "hide once valid". Simplest is to re-validate this field.
      const updatedErrors = validate(e.target.name, e.target.value);
      setErrors(updatedErrors);
    }
  };

  // Fetch roles
  useEffect(() => {
    dispatch(getAllRoles());
  }, [dispatch]);


  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      enqueueSnackbar("Please fix the errors in the form", { variant: "error" });
      return;
    }

    const payload = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      gender: user.gender,
      role: user.role,
      password: user.password,
      cpassword: user.cpassword,
    }

    // Convert files to Base64
    const convertFileToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        if (!file) {
          resolve(null);
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };

    const registrationCertificateBase64 = await convertFileToBase64(user.registrationCertificate);
    const doctorIdProofBase64 = await convertFileToBase64(user.doctorIdProof);
    const profilePhotoBase64 = await convertFileToBase64(user.profilePhoto);

    // Doctor specific fields
    if (user.role && user.role.toLowerCase().includes("doctor")) {
      payload.clinicname = user.clinicName;
      payload.clinicAddress = user.clinicAddress;
      payload.city = user.city;
      payload.state = user.state;
      payload.pincode = user.pincode;
      payload.qualification = user.qualification;
      payload.specialization = user.specialization;
      payload.registrationNumber = user.registrationNumber;
      payload.medicalCouncilName = user.medicalCouncil;
      payload.yearsOfExperience = user.experience;
      payload.registrationCertificate = registrationCertificateBase64;
      payload.doctorIdProof = doctorIdProofBase64;
      payload.profilePhoto = profilePhotoBase64;
    }

    dispatch(registerUser(payload));
  };


  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      Swal.fire({
        title: "Success!",
        text: "Registration successful!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      if (currentUser?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [error, isAuthenticated, dispatch, navigate, enqueueSnackbar, currentUser]);

  return (
    <>
      <MetaData title="Create Account | MedStore" />
      {loading && <BackdropLoader />}

      <div className="min-h-screen bg-[#eef2f6] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full bg-white rounded-[30px] shadow-xl overflow-hidden flex flex-col md:flex-row mt-20">

          {/* Sidebar / Left Panel - Fixed height or sticky in a real app, but here we just fill nicely */}
          <div className="md:w-1/3 bg-blue-600 text-white p-10 flex flex-col relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/medical-icons-blue.png')]"></div>

            {/* Header */}
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-8">
                <PersonAddIcon fontSize="large" />
                <span className="text-2xl font-bold tracking-wide">MedStore</span>
              </div>
              <h2 className="text-4xl font-extrabold leading-tight mb-4">Join Us Today</h2>
              <p className="text-blue-100 text-lg">Create your account to access our premium medical services and products.</p>
            </div>

            {/* Center Visual / Icons (New Addition) */}
            <div className="relative z-10 flex-grow flex flex-col justify-center items-center my-10 space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400 rounded-full opacity-20 blur-xl animate-pulse"></div>
                <div className="w-40 h-40 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center shadow-2xl">
                  <img src="https://cdn-icons-png.flaticon.com/512/1312/1312139.png" alt="Stethoscope Icon" className="w-24 h-24 opacity-90 drop-shadow-lg" style={{ filter: 'brightness(0) invert(1)' }} />
                </div>

                {/* Floating Small Icons */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg border border-blue-400">
                  <span className="text-xl">✚</span>
                </div>
                <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center shadow-lg border border-teal-400">
                  <span className="text-lg">💊</span>
                </div>
              </div>
            </div>

            {/* Footer Group */}
            <div className="relative z-10 mt-auto">
              <p className="text-sm text-blue-200">Already have an account?</p>
              <Link to="/login" className="mt-2 inline-block bg-white text-blue-600 px-6 py-3 rounded-full font-bold shadow-lg hover:bg-blue-50 hover:scale-105 transition-all duration-300 transform">
                Login Here
              </Link>
            </div>
          </div>

          {/* Main Form Area */}
          <div className="md:w-2/3 p-8 md:p-12">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
              <p className="text-gray-500 mt-2">Please fill in your details below.</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">

              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextField
                    label="Full Name"
                    name="name"
                    value={user.name}
                    onChange={handleDataChange}
                    fullWidth
                    variant="outlined"
                    InputProps={{ style: { borderRadius: '12px' } }}
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={user.email}
                    onChange={handleDataChange}
                    fullWidth
                    variant="outlined"
                    InputProps={{ style: { borderRadius: '12px' } }}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                  <TextField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={user.phone}
                    onChange={handleDataChange}
                    fullWidth
                    variant="outlined"
                    InputProps={{ style: { borderRadius: '12px' } }}
                    error={!!errors.phone}
                    helperText={errors.phone}
                  />
                  <FormControl fullWidth error={!!errors.gender}>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      name="gender"
                      value={user.gender}
                      onChange={handleDataChange}
                      label="Gender"
                      sx={{ borderRadius: '12px' }}
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                    </Select>
                    {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
                  </FormControl>
                </div>
                <TextField
                  label="Address"
                  name="address"
                  value={user.address}
                  onChange={handleDataChange}
                  fullWidth
                  multiline
                  rows={2}
                  variant="outlined"
                  className="mt-4"
                  InputProps={{ style: { borderRadius: '12px' } }}
                  sx={{ mt: 2 }}
                  error={!!errors.address}
                  helperText={errors.address}
                />
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Role Selection</h3>
                <FormControl fullWidth error={!!errors.role}>
                  <InputLabel>I am a...</InputLabel>
                  <Select
                    name="role"
                    value={user.role}
                    onChange={handleDataChange}
                    label="I am a..."
                    sx={{ borderRadius: '12px' }}
                  >
                    {loading ? <MenuItem disabled>Loading Roles...</MenuItem> :
                      roles.map((role) => (
                        <MenuItem key={role._id} value={role.name}>
                          {role.name}
                        </MenuItem>
                      ))
                    }
                  </Select>
                  {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
                </FormControl>
              </div>

              {/* Conditional Doctor Fields */}
              {user.role && user.role.toLowerCase().includes("doctor") && (
                <div className="bg-gray-50 p-6 rounded-2xl border border-blue-100 shadow-sm animate-fade-in-up">
                  <h3 className="text-lg font-semibold text-blue-700 mb-4 flex items-center">
                    <span className="mr-2">🩺</span> Doctor Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextField fullWidth label="Registration Number" name="registrationNumber" value={user.registrationNumber} onChange={handleDataChange} variant="outlined" InputProps={{ style: { borderRadius: '12px' } }} error={!!errors.registrationNumber} helperText={errors.registrationNumber} />
                    <TextField fullWidth label="Medical Council" name="medicalCouncil" value={user.medicalCouncil} onChange={handleDataChange} variant="outlined" InputProps={{ style: { borderRadius: '12px' } }} error={!!errors.medicalCouncil} helperText={errors.medicalCouncil} />
                    <TextField fullWidth label="Qualification" name="qualification" value={user.qualification} onChange={handleDataChange} variant="outlined" InputProps={{ style: { borderRadius: '12px' } }} error={!!errors.qualification} helperText={errors.qualification} />
                    <TextField fullWidth label="Specialization" name="specialization" value={user.specialization} onChange={handleDataChange} variant="outlined" InputProps={{ style: { borderRadius: '12px' } }} error={!!errors.specialization} helperText={errors.specialization} />
                    <TextField fullWidth label="Experience (Years)" type="number" name="experience" value={user.experience} onChange={handleDataChange} variant="outlined" InputProps={{ style: { borderRadius: '12px' } }} error={!!errors.experience} helperText={errors.experience} />
                    <TextField fullWidth label="Clinic Name" name="clinicName" value={user.clinicName} onChange={handleDataChange} variant="outlined" InputProps={{ style: { borderRadius: '12px' } }} error={!!errors.clinicName} helperText={errors.clinicName} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <TextField fullWidth label="City" name="city" value={user.city} onChange={handleDataChange} variant="outlined" InputProps={{ style: { borderRadius: '12px' } }} error={!!errors.city} helperText={errors.city} />
                    <TextField fullWidth label="State" name="state" value={user.state} onChange={handleDataChange} variant="outlined" InputProps={{ style: { borderRadius: '12px' } }} error={!!errors.state} helperText={errors.state} />
                    <TextField fullWidth label="Clinic Address" name="clinicAddress" value={user.clinicAddress} onChange={handleDataChange} multiline rows={2} variant="outlined" InputProps={{ style: { borderRadius: '12px' } }} className="md:col-span-2" error={!!errors.clinicAddress} helperText={errors.clinicAddress} />
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Upload Documents</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Button
                        variant="outlined"
                        component="label"
                        startIcon={<CloudUploadIcon />}
                        sx={{ borderRadius: '10px', textTransform: 'none', height: '50px' }}
                      >
                        {resume ? "Cert. Selected" : "Medical Cert."}
                        <input type="file" name="registrationCertificate" hidden onChange={handleDataChange} />
                      </Button>
                      <Button
                        variant="outlined"
                        component="label"
                        startIcon={<CloudUploadIcon />}
                        sx={{ borderRadius: '10px', textTransform: 'none', height: '50px' }}
                      >
                        {idProof ? "ID Selected" : "Govt ID Proof"}
                        <input type="file" name="doctorIdProof" hidden onChange={handleDataChange} />
                      </Button>
                      <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 rounded-full overflow-hidden border">
                          <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                        <Button
                          variant="outlined"
                          component="label"
                          size="small"
                          sx={{ borderRadius: '10px', textTransform: 'none' }}
                        >
                          Photo
                          <input type="file" name="profilePhoto" hidden onChange={handleDataChange} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Security</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={user.password}
                    onChange={handleDataChange}
                    fullWidth
                    variant="outlined"
                    InputProps={{ style: { borderRadius: '12px' } }}
                    error={!!errors.password}
                    helperText={errors.password}
                  />
                  <TextField
                    label="Confirm Password"
                    name="cpassword"
                    type="password"
                    value={user.cpassword}
                    onChange={handleDataChange}
                    fullWidth
                    variant="outlined"
                    InputProps={{ style: { borderRadius: '12px' } }}
                    error={!!errors.cpassword}
                    helperText={errors.cpassword}
                  />
                </div>
              </div>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  borderRadius: '15px',
                  padding: '14px',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  background: 'linear-gradient(45deg, #2563eb 30%, #3b82f6 90%)',
                  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                  textTransform: 'none',
                  marginTop: '20px'
                }}
              >
                Register
              </Button>

            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;