import { useState } from "react";
import Navbar from "../components/Navbar"
import { useEffect } from "react";
import axios from "axios";
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, TextField, Button, NativeSelect, Modal, Stack, Pagination, List, ListItem, Typography, IconButton, Box } from "@mui/material";
import Cookies from "js-cookie";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import "../css/borrow-book.css"
import Footer from "../components/Footer";


function BorrowBook(props) {
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

    const [borrowPayStatusAdd, setBorrowPayStatusAdd] = useState();
    const [bookIDAdd, setBookIDAdd] = useState();
    const [staffIDAdd, setStaffIDAdd] = useState();
    const [libraryCardIDAdd, setLibraryCardIDAdd] = useState();
    const [borrowPayDateAdd, setBorrowPayDateAdd] = useState();

    const [borrowPayStatusEdit, setBorrowPayStatusEdit] = useState();
    const [borrowPayIDEdit, setBorrowPayIDEdit] = useState();
    const [bookIDEdit, setBookIDEdit] = useState();
    const [staffIDEdit, setStaffIDEdit] = useState();
    const [libraryCardIDEdit, setLibraryCardIDEdit] = useState();
    const [borrowPayDateEdit, setBorrowPayDateEdit] = useState();

    const [borrowPayIDSearch, setborrowPayIDSearch] = useState("");
    const [borrowPayNameSearch, setBorrowPayNameSearch] = useState("");
    const [borrowPayDateSearch, setBorrowPayDateSearch] = useState("");
    const [isSearch, setIsSearch] = useState(false)

    const [openModalEditBorrowPay, setOpenModalEditBorrowPay] = useState("");
    const [openModalConfirmDeleteBorrowPay, setOpenModalConfirmDeleteBorrowPay] = useState("");


    const handleOpenModalConfirmDeleteBorrowBook = (e, value) => {
        setOpenModalConfirmDeleteBorrowPay(true);
    }
    const handleCloseModalConfirmDeleteBorrowBook = (e, value) => {
        setOpenModalConfirmDeleteBorrowPay(false);
    }

    const handleOpenModalEditBorrowBook = (e, value) => {
        borrowPayList.forEach(item => {
            // alert(e.target.dataset.borrowpayid)
            if (item.borrowpayid == e.target.dataset.borrowpayid) {
                //alert(e.target.dataset.borrowpayid)
                //alert(item.staffid)
                setBorrowPayIDEdit(item.borrowpayid);
                setLibraryCardIDEdit(item.librarycardid);
                setStaffIDEdit(item.staffid);
                setBookIDEdit(item.bookid);
                setBorrowPayStatusEdit(item.status);
                setBorrowPayDateEdit(item.borrowpaydate);
            }
        })
        setOpenModalEditBorrowPay(true)
    }
    const handleCloseModalEditBorrowBook = () => {
        setOpenModalEditBorrowPay(false)
    }


    const handleChangeBorrowPayStatusAdd = (event) => {
        setBorrowPayStatusAdd(event.target.value);
    };
    const handleChangeBookIDAdd = (event) => {
        //alert(bookIDAdd)
        setBookIDAdd(event.target.value);
    };
    const handleChangeStaffIDAdd = (event) => {
        setStaffIDAdd(event.target.value);
    };
    const handleChangeLibraryCardIDAdd = (event) => {
        setLibraryCardIDAdd(event.target.value);
    };
    const handleChangeBorrowPayDateAdd = (event) => {
        setBorrowPayDateAdd(event.target.value);
    };

    const handleChangeBorrowPayStatusEdit = (event) => {
        setBorrowPayStatusEdit(event.target.value);
    };
    const handleChangeBookIDEdit = (event) => {
        //alert(bookIDAdd)
        setBookIDEdit(event.target.value);
    };
    const handleChangeStaffIDEdit = (event) => {
        setStaffIDEdit(event.target.value);
    };
    const handleChangeLibraryCardIDEdit = (event) => {
        setLibraryCardIDEdit(event.target.value);
    };
    const handleChangeBorrowPayDateEdit = (event) => {
        setBorrowPayDateEdit(event.target.value);
    };

    const handleChangeBorrowPayIDSearch = (event) => {
        setborrowPayIDSearch(event.target.value);
    };

    const handleChangeBorrowPayNameSearch = (event) => {
        setBorrowPayNameSearch(event.target.value);
    };


    const [libraryCardFullList, setLibraryCardFullList] = useState([])
    const [staffFullList, setStaffFullList] = useState([])
    const [bookFullList, setBookFullList] = useState([])

    const [borrowPayList, setBorrowPayList] = useState([])
    const [staffList, setStaffList] = useState([])
    const [libraryCardList, setLibraryCardList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [maxPage, setMaxPage] = useState()
    const [itemPerPage, setItemPerPage] = useState(8)

    const [openModalAddBorrowPay, setOpenModalAddBorrowPay] = useState(false)


    const handleOpenBorrowPayAddModel = () => setOpenModalAddBorrowPay(true);
    const handleCloseBorrowPayAddModel = () => setOpenModalAddBorrowPay(false);

    const getLibraryCardName = (libraryCardID) => {
        //alert()
        libraryCardList.forEach(item => {
            if (item.librarycardid == libraryCardID) {
                //alert(item.name)
                return "item.name;"
            }
        })
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
            axios.get("http://localhost:8080/api/v1/borrow-pay", { params: { page: 1, itemperpage: itemPerPage, "token": Cookies.get('token') } })
                .then((res) => {
                    // alert(res.data.borrowPayList.length)
                    setBorrowPayList(res.data.borrowPayList);
                    //setFullBookList(res.data)
                    setMaxPage(res.data.maxPage)
                    setLibraryCardList(res.data.libraryCardList)
                    setStaffList(res.data.staffList)
                    //alert(res.data.length)

                }, (error) => {
                    if (error.response.status == 408) {
                        window.location.href = "/";
                    }
                })
            axios.get("http://localhost:8080/api/v1/books", { params: { "token": Cookies.get('token') } })
                .then(res => {
                    setBookFullList(res.data.bookList)
                    //alert(res.data.bookList.length)
                    //alert()
                }, (error) => {
                    if (error.response.status == 408) {
                        window.location.href = "/";
                    }
                })
            axios.get("http://localhost:8080/api/v1/library-cards", { params: { "token": Cookies.get('token') } })
                .then(res => {
                    setLibraryCardFullList(res.data.libraryCardList)
                    //alert(res.data.length)
                    //alert()
                }, (error) => {
                    if (error.response.status == 408) {
                        window.location.href = "/";
                    }
                })
            axios.get("http://localhost:8080/api/v1/staffs", { params: { "token": Cookies.get('token') } })
                .then(res => {
                    setStaffFullList(res.data.staffList)
                    //alert(res.data.length)
                }, (error) => {
                    if (error.response.status == 408) {
                        window.location.href = "/";
                    }
                })

        }
        else {

            window.location.href = "/";
        }

        //alert(res.name)
    }, []);
    const saveBorrowBook = () => {
        if (Cookies.get('token') != "undefined") {
            //alert(borrowPayStatusEdit)
            var bodyFormData = new FormData();
            bodyFormData.append("borrowpayid", borrowPayIDEdit);
            bodyFormData.append("bookid", bookIDEdit)
            bodyFormData.append("borrowpaydate", borrowPayDateEdit)
            bodyFormData.append("librarycardid", libraryCardIDEdit)
            bodyFormData.append("staffid", staffIDEdit)
            bodyFormData.append("status", borrowPayStatusEdit)
            bodyFormData.append("token", Cookies.get('token'))
            axios.put("http://localhost:8080/api/v1/borrow-pay", bodyFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then((res) => {
                    window.location.href = "/borrow-book";
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
    const addNewBorrowBook = () => {
        if (Cookies.get('token') != "undefined") {

            var bodyFormData = new FormData();
            bodyFormData.append("bookid", bookIDAdd)
            bodyFormData.append("borrowpaydate", borrowPayDateAdd)
            bodyFormData.append("librarycardid", libraryCardIDAdd)
            bodyFormData.append("staffid", staffIDAdd)
            bodyFormData.append("status", borrowPayStatusAdd)
            bodyFormData.append("token", Cookies.get('token'))
            axios.post("http://localhost:8080/api/v1/borrow-pay", bodyFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then((res) => {
                    window.location.href = "/borrow-book";
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
    const searchBorrowPay = () => {
        if (Cookies.get('token') != "undefined") {
            var bodyFormData = new FormData();
            bodyFormData.append("borrowpayid", borrowPayIDSearch)
            bodyFormData.append("borrowpayname", borrowPayNameSearch)
            bodyFormData.append("page", 1)
            bodyFormData.append("itemperpage", itemPerPage)
            bodyFormData.append("token", Cookies.get('token'))

            axios.post("http://localhost:8080/api/v1/borrow-pay/search", bodyFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then((res) => {
                    setBorrowPayList(res.data.borrowPayList);
                    //setFullBookList(res.data)
                    setMaxPage(res.data.maxPage)
                    setLibraryCardList(res.data.libraryCardList)
                    setStaffList(res.data.staffList)
                    //alert(res.data.libraryCardList.length)
                    setIsSearch(true)

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
    const deleteBorrowPay = () => {
        if (Cookies.get('token') != "undefined") {

            axios.delete("http://localhost:8080/api/v1/borrow-pay", { params: { borrowpayid: borrowPayIDEdit, token: Cookies.get('token') } })
                .then(res => {

                    //alert(Math.ceil(res.data.length / itemPerPage))
                    //alert(borrowPayIDEdit)
                    window.location.href = "/borrow-book";
                }, error => {
                    if (error.response.status == 408) {
                        window.location.href = "/";
                    }
                })


        }
        else {

            window.location.href = "/";
        }
    }
    const reloadBorrowBook = () => {
        window.location.href = "/borrow-book";
    };
    return (

        <div className="borrow-book-component">
            <Navbar />
            <div className="row " style={{ height: "70vh" }}>
                <div class="col-lg-2 ml-3 mt-4">
                    <div className="border border-primary rounded p-3 mb-3">
                        <h6 className="mouse-out-hover p-2" style={{ fontSize: "17px", zIndex: 1 }}>T??m ki???m m?????n s??ch</h6>
                        {/* <TextField
                            id="standard-password-input"
                            label="M?? m?????n"
                            type="text"
                            autoComplete="current-password"
                            variant="standard"
                            value={borrowPayIDSearch}
                            onChange={handleChangeBorrowPayIDSearch}
                        /> */}
                        <TextField className="mb-3"
                            id="standard-password-input"
                            label="T??n ng?????i m?????n"
                            type="text"
                            autoComplete="current-password"
                            variant="standard"
                            value={borrowPayNameSearch}
                            onChange={handleChangeBorrowPayNameSearch}
                        />

                        <br />
                        <Button size="small" className="mr-2" onClick={searchBorrowPay} variant="contained" endIcon={<SearchIcon />}>
                            T??m
                        </Button>
                        <Button color="success" size="small" onClick={reloadBorrowBook} variant="contained" endIcon={<RestartAltIcon />}>
                            T???o l???i
                        </Button>

                    </div>
                    <Button onClick={handleOpenBorrowPayAddModel} variant="contained" endIcon={<AddIcon />}>
                        Th??m m?????n/tr???
                    </Button>

                </div>
                <div className="col-lg-8 justify-content-center ml-5">
                    <div className="row d-flex justify-content-center">
                        <h4 className="mt-4 mb-4 mouse-out-hover p-2" style={{ fontSize: "25px", zIndex: 1, color: "blue" }}>DANH S??CH M?????N S??CH</h4>
                        <table class="table table-hover table-dark">
                            <thead>
                                <tr>
                                    <th className="text-center" scope="col" >M?? m?????n/tr???</th>
                                    <th className="text-center" scope="col">M?? th??? m?????n</th>
                                    <th className="text-center" scope="col">T??n ng?????i m?????n</th>
                                    <th className="text-center" scope="col">M?? nh??n vi??n</th>
                                    <th className="text-center" scope="col">T??n nh??n vi??n</th>
                                    <th className="text-center" scope="col">Ng??y m?????n</th>
                                    <th className="text-center" scope="col">Tr???ng th??i</th>
                                </tr>
                            </thead>
                            <tbody>
                                {borrowPayList.map(item => {
                                    return <tr data-borrowpayid={1} onClick={handleOpenModalEditBorrowBook}>
                                        <th data-borrowpayid={item.borrowpayid} scope="row" className="text-center">{item.borrowpayid}</th>

                                        <td data-borrowpayid={item.borrowpayid} className="text-center" >{item.librarycardid}</td>
                                        <td data-borrowpayid={item.borrowpayid} className="text-center">
                                            {libraryCardList.map(libraryCard => {
                                                if (libraryCard.librarycardid == item.librarycardid) {
                                                    //alert(libraryCard.name)
                                                    return libraryCard.name
                                                }
                                            })}
                                        </td>

                                        <td data-borrowpayid={item.borrowpayid} className="text-center">{item.staffid}</td>
                                        <td data-borrowpayid={item.borrowpayid} className="text-center">
                                            {staffList.map(staff => {
                                                if (staff.staffid == item.staffid) {
                                                    //alert(libraryCard.name)
                                                    return staff.staffname
                                                }
                                            })}
                                        </td>
                                        <td data-borrowpayid={item.borrowpayid} className="text-center" >{item.borrowpaydate}</td>
                                        <td data-borrowpayid={item.borrowpayid} className="text-center" >
                                            {item.status == false ? <div>M?????n</div> : <div>Tr???</div>}
                                        </td>
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
                open={openModalAddBorrowPay}
                onClose={handleCloseBorrowPayAddModel}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >

                <Box sx={{ ...style, width: 400, borderRadius: "10px" }}>
                    <h4 className="text-danger mb-3">Th??m m?????n/tr??? s??ch</h4>

                    <Box sx={{ minWidth: 120, maxWidth: 130 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">T??n s??ch</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={bookIDAdd}
                                label="T??n s??ch"
                                onChange={handleChangeBookIDAdd}
                                className="mb-4"
                            >
                                {bookFullList.map(item => (
                                    <MenuItem value={item.bookid}>{item.booktitle}</MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 170, maxWidth: 180 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">T??n ng?????i m?????n</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={bookIDAdd}
                                label="T??n ng?????i m?????n"
                                className="mb-4"
                                onChange={handleChangeLibraryCardIDAdd}
                            >
                                {libraryCardFullList.map(item => (
                                    <MenuItem value={item.librarycardid}>{item.name}</MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 170, maxWidth: 180 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">T??n nh??n vi??n</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={bookIDAdd}
                                label="T??n nh??n vi??n"
                                class=""
                                onChange={handleChangeStaffIDAdd}
                            >
                                {staffFullList.map(item => (
                                    <MenuItem value={item.staffid}>{item.staffname}</MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                    </Box>


                    <br></br>
                    <TextField className="mb-3"
                        id="date"
                        label="Ng??y m?????n"
                        type="date"
                        sx={{ width: 220 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={borrowPayDateAdd}
                        onChange={handleChangeBorrowPayDateAdd}
                    />
                    <Box sx={{ minWidth: 120, maxWidth: 130 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">M?????n/Tr???</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={borrowPayStatusAdd}
                                label="M?????n/Tr???"
                                onChange={handleChangeBorrowPayStatusAdd}
                            >
                                <MenuItem value={false}>M?????n</MenuItem>
                                <MenuItem value={true}>Tr???</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <div className="text-danger mb-3 " id="warning-add-book"></div>
                    <Button onClick={addNewBorrowBook} className="mr-2" variant="contained" endIcon={<AddIcon />}>
                        Th??m phi???u
                    </Button>

                </Box>
            </Modal>
            <Modal class="overflow-auto"
                open={openModalEditBorrowPay}
                onClose={handleCloseModalEditBorrowBook}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400, borderRadius: "10px" }}>
                    <h5 style={{ color: "red" }}>TH??NG TIN M?????N S??CH</h5>

                    <FormControl sx={{ minWidth: 180 }} className="mb-3" >
                        <InputLabel id="demo-simple-select-helper-label">T??n ng?????i m?????n</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            label="T??n ng?????i m?????n"
                            value={libraryCardIDEdit}
                            onChange={handleChangeLibraryCardIDEdit}
                        >
                            {libraryCardFullList.map(item => (
                                <MenuItem value={item.librarycardid} data-authorid={item.librarycardid} >
                                    {item.name}
                                </MenuItem>

                            ))}


                        </Select>

                    </FormControl>
                    <FormControl sx={{ minWidth: 180 }} className="mb-3" >
                        <InputLabel id="demo-simple-select-helper-label">T??n nh??n vi??n</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"

                            label="T??n nh??n vi??n"
                            value={staffIDEdit}
                            onChange={handleChangeStaffIDEdit}

                        >
                            {staffList.map(item => (
                                <MenuItem value={item.staffid} data-authorid={item.staffid}>
                                    {item.staffname}
                                </MenuItem>

                            ))}


                        </Select>

                    </FormControl>
                    <TextField className="mb-3"
                        id="date"
                        label="Ng??y m?????n"
                        type="date"
                        defaultValue="2017-05-24"
                        sx={{ width: 220 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={borrowPayDateEdit}
                        onChange={handleChangeBorrowPayDateEdit}
                    />
                    <Box sx={{ minWidth: 120, maxWidth: 130 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">M?????n/Tr???</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={borrowPayStatusEdit}
                                label="M?????n/Tr???"
                                className="mb-3"
                                onChange={handleChangeBorrowPayStatusEdit}
                            >
                                <MenuItem value={0}>M?????n</MenuItem>
                                <MenuItem value={1}>Tr???</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Button className="mr-2" variant="contained" endIcon={<AddIcon />} onClick={saveBorrowBook}>
                        L??u th??ng tin
                    </Button>
                    <Button onClick={handleOpenModalConfirmDeleteBorrowBook} color="error" variant="contained" endIcon={<DeleteIcon />} >
                        Xo??
                    </Button>

                </Box>
            </Modal>
            <Modal
                open={openModalConfirmDeleteBorrowPay}
                onClose={handleCloseModalConfirmDeleteBorrowBook}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style, width: 500 }}>
                    <Typography className="" id="modal-modal-title" variant="h6" component="h2">
                        C???nh b??o
                    </Typography>
                    <Typography className="text-danger mb-4" id="modal-modal-description" sx={{ mt: 2 }}>
                        B???n c?? ch???c ch???n mu???n xo?? phi???u m?????n n??y?
                    </Typography>
                    <Button onClick={deleteBorrowPay} className="mr-2" variant="contained" endIcon={<AddIcon />}>
                        Xo??
                    </Button>
                    <Button onClick={handleCloseModalConfirmDeleteBorrowBook} className="mr-2" variant="contained" endIcon={<AddIcon />}>
                        Hu???
                    </Button>
                </Box>
            </Modal>
            <Footer className="footer" />
        </div>
    )
}
export default BorrowBook