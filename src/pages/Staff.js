import { useState } from "react";
import Navbar from "../components/Navbar"
import { useEffect } from "react";
import axios from "axios";
import { TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody, Stack, Pagination, TextField, Button, Modal, Box, FormControl, InputLabel, Select, MenuItem, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Cookies from "js-cookie";
import Footer from "../components/Footer";
import "../css/staff.css"

function Staff(props) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [staffList, setStaffList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [maxPage, setMaxPage] = useState()
    const [itemPerPage, setItemPerPage] = useState(8)

    const [openModalEditStaff, setOpenModalEditStaff] = useState(false);
    const [staffIDOldEdit, setStaffIDOldEdit] = useState("1");
    const [staffIDEdit, setStaffIDEdit] = useState("1");
    const [dateOfBirthEdit, setDateOfBirthEdit] = useState("2000-09-02");
    const [sexEdit, setSexEdit] = useState("0");
    const [staffNameEdit, setStaffNameEdit] = useState("ABCD");

    const handleCloseModalAddStaff = () => {
        setOpenModalAddStaff(false);
    }
    const handleOpenModalAddStaff = () => {
        setOpenModalAddStaff(true);
    }
    const handleCloseModalEditStaff = () => {
        setOpenModalEditStaff(false);
    }
    const handleOpenModalEditStaff = (e, data) => {
        //alert(e.target.dataset.staffid)

        staffList.forEach(item => {
            if (item.staffid == e.target.dataset.staffid) {
                setStaffIDOldEdit(item.staffid);
                setStaffIDEdit(item.staffid);
                setSexEdit(item.sex)
                setStaffNameEdit(item.staffname);
                setDateOfBirthEdit(item.dateofbirth);
            }
        })
        setOpenModalEditStaff(true);
    }

    const handleChangeStaffIDEdit = (e) => {
        setStaffIDEdit(e.target.value);
    }
    const handleChangeStaffNameEdit = (e) => {
        setStaffNameEdit(e.target.value);
    }
    const handleChangeSexEdit = (e) => {
        setSexEdit(e.target.value);
    }
    const handleChangeDateOfBirthEdit = (e) => {
        setDateOfBirthEdit(e.target.value);
    }

    const [openModalAddStaff, setOpenModalAddStaff] = useState(false);
    const [staffIDAdd, setStaffIDAdd] = useState();
    const [dateOfBirthAdd, setDateOfBirthAdd] = useState("2000-09-02");
    const [sexAdd, setSexAdd] = useState();
    const [staffNameAdd, setStaffNameAdd] = useState();

    const handleChangeStaffIDAdd = (e) => {
        setStaffIDAdd(e.target.value);
    }
    const handleChangeStaffNameAdd = (e) => {
        setStaffNameAdd(e.target.value);
    }
    const handleChangeSexAdd = (e) => {
        setSexAdd(e.target.value);
    }
    const handleChangeDateOfBirthAdd = (e) => {
        setDateOfBirthAdd(e.target.value);
    }

    useEffect(() => {
        //alert(id)
        if (Cookies.get('token') != "undefined") {
            axios.post('http://localhost:8080/api/v1/login', null, { params: { token: Cookies.get('token') } })
                .then(res => {
                    if (res.data.token.role != "admin") {
                        window.location.href = "/home-user"
                    }
                    

                },
                    error => {
                        alert(error);
                    })
            axios.get("http://localhost:8080/api/v1/staffs", { params: { page: currentPage, itemperpage: itemPerPage, token: Cookies.get('token') } })
                .then(res => {
                    setStaffList(res.data.staffList)
                    setMaxPage(res.data.maxPage)
                    //alert()
                }, (error) => {
                    if (error.response.status == 408) {
                        window.location.href = "/";
                    }
                })
        }
        else {

        }


        //alert(res.name)
    }, []);
    const addStaff = () => {
        if (Cookies.get('token') != "undefined") {
            var bodyFormData = new FormData();
            bodyFormData.append("staffid", staffIDAdd)
            bodyFormData.append("staffname", staffNameAdd)
            bodyFormData.append("sex", sexAdd)
            bodyFormData.append("dateofbirth", dateOfBirthAdd)
            bodyFormData.append("token", Cookies.get('token'))
            alert(dateOfBirthAdd)
            axios.post("http://localhost:8080/api/v1/staffs", bodyFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then((res) => {
                    window.location.href = "/staff";

                }, (error) => {
                    if (error.response.status == 408) {
                        window.location.href = "/";
                    }
                })
        }
        else {

            window.location.href = "/";
        }
    }
    const saveStaff = () => {
        if (Cookies.get('token') != "undefined") {
            var bodyFormData = new FormData();
            bodyFormData.append("staffidold", staffIDOldEdit)
            bodyFormData.append("staffid", staffIDEdit)
            bodyFormData.append("staffname", staffNameEdit)
            bodyFormData.append("sex", sexEdit)
            bodyFormData.append("dateofbirth", dateOfBirthEdit)
            bodyFormData.append("token", Cookies.get('token'))
            axios.put("http://localhost:8080/api/v1/staffs", bodyFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then((res) => {
                    window.location.href = "/staff";

                }, (error) => {
                    if (error.response.status == 408) {
                        window.location.href = "/";
                    }
                })
        }
        else {

            window.location.href = "/";
        }
    }
    return (
        <div className="staff-component">
            <Navbar />
            <div className="row " style={{ height: "70vh" }}>
                <div class="col-lg-2 ml-3 mt-4">
                    <div className="border border-primary rounded p-3 mb-3">
                        <h6 className="mouse-out-hover p-2" style={{ fontSize: "18px", zIndex: 1, color: "blue" }}>T??m ki???m nh??n vi??n</h6>
                        <TextField
                            id="standard-password-input"
                            label="M?? nh??n vi??n"
                            type="text"
                            autoComplete="current-password"
                            variant="standard"
                            value={null}
                            onChange={null}
                        />
                        <TextField className="mb-3"
                            id="standard-password-input"
                            label="T??n nh??n vi??n"
                            type="text"
                            autoComplete="current-password"
                            variant="standard"
                            value={null}
                            onChange={null}
                        />

                        <br />
                        <Button onClick={handleOpenModalAddStaff} variant="contained" endIcon={<SearchIcon />}>
                            T??m
                        </Button>

                    </div>
                    <Button onClick={handleOpenModalAddStaff} variant="contained" endIcon={<AddIcon />}>
                        Th??m nh??n vi??n
                    </Button>

                </div>
                <div className="col-lg-8 justify-content-center ml-5">
                    <div className="row d-flex justify-content-center">
                        <h4 className="mt-4 mb-4 mouse-out-hover p-2" style={{ fontSize: "25px", zIndex: 1, color: "blue" }}>DANH S??CH NH??N VI??N</h4>
                        <table class="table table-hover table-dark">
                            <thead>
                                <tr>
                                    <th className="text-center" scope="col" >M?? nh??n vi??n</th>
                                    <th className="text-center" scope="col">T??n nh??n vi??n</th>
                                    <th className="text-center" scope="col">Gi???i t??nh</th>
                                    <th className="text-center" scope="col">Ng??y sinh</th>

                                </tr>
                            </thead>
                            <tbody>
                                {staffList.map(item => {
                                    return <tr onClick={handleOpenModalEditStaff}>
                                        <th data-staffid={item.staffid} scope="row" className="text-center">{item.staffid}</th>
                                        <th data-staffid={item.staffid} scope="row" className="text-center">{item.staffname}</th>
                                        <th data-staffid={item.staffid} scope="row" className="text-center">{item.sex == 1 ? <div>N???</div> : <div>Nam</div>}</th>
                                        <td data-staffid={item.staffid} className="text-center">{item.dateofbirth}</td>

                                    </tr>
                                })}
                            </tbody>

                        </table>
                        <Stack spacing={2}>
                            <Pagination page={currentPage} count={maxPage} color="secondary" />
                        </Stack>
                    </div>


                </div>

            </div>
            <Modal
                open={openModalAddStaff}
                onClose={handleCloseModalAddStaff}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >

                <Box sx={{ ...style, width: 400 }}>
                    <h3>Th??m m?????n/tr??? s??ch</h3>
                    <TextField
                        id="standard-password-input"
                        label="M?? m?????n"
                        type="text"
                        autoComplete="current-password"
                        variant="standard"
                        value={null}
                        onChange={null}
                        className="mb-4"
                    />




                    <br></br>
                    <TextField className="mb-3"
                        id="date"
                        label="Ng??y m?????n"
                        type="date"
                        sx={{ width: 220 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={null}
                        onChange={null}
                    />
                    <Box sx={{ minWidth: 120, maxWidth: 130 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">M?????n/Tr???</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={null}
                                label="M?????n/Tr???"
                                onChange={null}
                            >
                                <MenuItem value={false}>M?????n</MenuItem>
                                <MenuItem value={true}>Tr???</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <div className="text-danger mb-3 " id="warning-add-book"></div>
                    <Button onClick={null} className="mr-2" variant="contained" endIcon={<AddIcon />}>
                        Th??m th???
                    </Button>

                </Box>
            </Modal>
            <Modal
                open={openModalEditStaff}
                onClose={handleCloseModalEditStaff}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        TH??NG TIN NH??N VI??N
                    </Typography>
                    <TextField
                        id="standard-password-input"
                        label="M?? nh??n vi??n"
                        type="text"
                        autoComplete="current-password"
                        variant="standard"
                        value={staffIDEdit}
                        onChange={handleChangeStaffIDEdit}
                    />
                    <br></br>
                    <TextField
                        className="mb-4"
                        id="standard-password-input"
                        label="T??n nh??n vi??n"
                        type="text"
                        autoComplete="current-password"
                        variant="standard"
                        value={staffNameEdit}
                        onChange={handleChangeStaffNameEdit}
                    />
                    <br></br>
                    <Box sx={{ minWidth: 170, maxWidth: 180 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Gi???i t??nh</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={sexEdit}
                                label="Gi???i t??nh"
                                className=""
                                onChange={handleChangeSexEdit}
                            >

                                <MenuItem value={0}>Nam</MenuItem>
                                <MenuItem value={1}>N???</MenuItem>

                            </Select>
                        </FormControl>
                    </Box>
                    <br></br>
                    <TextField className="mb-3"
                        id="date"
                        label="Ng??y sinh"
                        type="date"
                        defaultValue="2017-05-24"
                        sx={{ width: 220 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={dateOfBirthEdit}
                        onChange={handleChangeDateOfBirthEdit}
                    />
                    <Button onClick={saveStaff} className="mr-2" variant="contained" endIcon={<AddIcon />}>
                        L??u th??ng tin
                    </Button>
                    <Button onClick={null} className="mr-2" variant="contained" endIcon={<AddIcon />}>
                        Xo??
                    </Button>
                </Box>
            </Modal>
            <Modal
                open={openModalAddStaff}
                onClose={handleCloseModalAddStaff}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        TH??M NH??N VI??N
                    </Typography>
                    <TextField
                        id="standard-password-input"
                        label="M?? nh??n vi??n"
                        type="text"
                        autoComplete="current-password"
                        variant="standard"
                        value={staffIDAdd}
                        onChange={handleChangeStaffIDAdd}
                    />
                    <br></br>
                    <TextField
                        className="mb-4"
                        id="standard-password-input"
                        label="T??n nh??n vi??n"
                        type="text"
                        autoComplete="current-password"
                        variant="standard"
                        value={staffNameAdd}
                        onChange={handleChangeStaffNameAdd}
                    />
                    <br></br>
                    <Box sx={{ minWidth: 170, maxWidth: 180 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Gi???i t??nh</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={sexAdd}
                                label="Gi???i t??nh"
                                className=""
                                onChange={handleChangeSexAdd}
                            >

                                <MenuItem value={0}>Nam</MenuItem>
                                <MenuItem value={1}>N???</MenuItem>

                            </Select>
                        </FormControl>
                    </Box>
                    <br></br>
                    <TextField className="mb-3"
                        id="date"
                        label="Ng??y sinh"
                        type="date"
                        defaultValue="2000-09-02"
                        sx={{ width: 220 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={dateOfBirthAdd}
                        onChange={handleChangeDateOfBirthAdd}
                    />
                    <Button onClick={addStaff} className="mr-2" variant="contained" endIcon={<AddIcon />}>
                        Th??m nh??n vi??n
                    </Button>

                </Box>
            </Modal>
            <Footer />
        </div>
    )
}
export default Staff