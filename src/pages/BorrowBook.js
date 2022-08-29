import { useState } from "react";
import Navbar from "../components/Navbar"
import { useEffect } from "react";
import axios from "axios";
import { TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody, Stack, Pagination, TextField, Button, Modal, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Cookies from "js-cookie";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

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
    const [borrowPayDate, setBorrowPayDate] = useState();

    const [borrowPayIDSearch, setborrowPayIDSearch] = useState("");
    const [borrowPayNameSearch, setBorrowPayNameSearch] = useState("");
    const [isSearch, setIsSearch] = useState(false)

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
        setBorrowPayDate(event.target.value);
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

            axios.get("http://localhost:8080/api/v1/borrow-pay", { params: { page: 1, itemperpage: itemPerPage } })
                .then((res) => {
                    //alert(res.data.borrowPayList.length)
                    setBorrowPayList(res.data.borrowPayList);
                    //setFullBookList(res.data)
                    setMaxPage(res.data.maxPage)
                    setLibraryCardList(res.data.libraryCardList)
                    setStaffList(res.data.staffList)
                    //alert(res.data.length)
                    //alert()
                }, (error) => {
                    alert(error)
                })
            axios.get("http://localhost:8080/api/v1/books")
                .then(res => {
                    setBookFullList(res.data.bookList)
                    //alert(res.data.bookList.length)
                    //alert()
                }, (error) => {
                    alert(error)
                })
            axios.get("http://localhost:8080/api/v1/library-cards")
                .then(res => {
                    setLibraryCardFullList(res.data.libraryCardList)
                    //alert(res.data.length)
                    //alert()
                })
            axios.get("http://localhost:8080/api/v1/staffs")
                .then(res => {
                    setStaffFullList(res.data.staffList)
                    //alert(res.data.length)
                }, (error) => {
                    alert(error)
                })

        }
        else {

            window.location.href = "/";
        }

        //alert(res.name)
    }, []);
    const saveBorrowBook = () => {
        var bodyFormData = new FormData();
        bodyFormData.append("bookid", bookIDAdd)
        bodyFormData.append("borrowpaydate", borrowPayDate)
        bodyFormData.append("librarycardid", libraryCardIDAdd)
        bodyFormData.append("staffid", staffIDAdd)
        axios.post("http://localhost:8080/api/v1/borrow-pay", bodyFormData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((res) => {
                alert()
            }, (error) => {
                document.getElementById("warning-add-book").innerHTML = "Thêm sách thất bại"
            })
    }
    const searchBorrowPay = () => {
        if (Cookies.get('token') != "undefined") {
            axios.post("http://localhost:8080/api/v1/login", null, { params: { token: Cookies.get('token') } })
                .then((res) => {
                    //alert()
                    if (res.status == 200) {
                        axios.post("http://localhost:8080/api/v1/borrow-pay/search", null, { params: { borrowpayid: borrowPayIDSearch, borrowpayname: borrowPayNameSearch, page: 1, itemperpage: itemPerPage } }, {

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
                                alert(error)
                            })
                    }
                    else {
                        window.location.href = "/";
                    }
                    //alert()
                }, (error) => {
                    alert(Cookies.get('token'))
                    if (error.response.status == 400 || error.response.status == 401 || error.response.status == 404) {
                        window.location.href = "/"
                    }
                })
        }
        else {

            window.location.href = "/";
        }
    }
    return (

        <div>
            <Navbar />
            <div className="row ">
                <div class="col-lg-2 ml-3 mt-4">
                    <div className="border border-primary rounded p-3 mb-3">
                        <h6 className="">Tìm kiếm mượn sách</h6>
                        <TextField
                            id="standard-password-input"
                            label="Mã mượn"
                            type="text"
                            autoComplete="current-password"
                            variant="standard"
                            value={borrowPayIDSearch}
                            onChange={handleChangeBorrowPayIDSearch}
                        />
                        <TextField className="mb-3"
                            id="standard-password-input"
                            label="Tên người mượn"
                            type="text"
                            autoComplete="current-password"
                            variant="standard"
                            value={borrowPayNameSearch}
                            onChange={handleChangeBorrowPayNameSearch}
                        />

                        <br />
                        <Button onClick={searchBorrowPay} variant="contained" endIcon={<SearchIcon />}>
                            Tìm
                        </Button>

                    </div>
                    <Button onClick={handleOpenBorrowPayAddModel} variant="contained" endIcon={<AddIcon />}>
                        Thêm mượn/trả
                    </Button>

                </div>
                <div className="col-lg-8 justify-content-center ml-5">
                    <div className="row d-flex justify-content-center">
                        <h4>DANH SÁCH MƯỢN SÁCH</h4>
                        <table class="table table-hover table-dark">
                            <thead>
                                <tr>
                                    <th className="text-center" scope="col" >Mã mượn/trả</th>
                                    <th className="text-center" scope="col">Mã thẻ mượn</th>
                                    <th className="text-center" scope="col">Tên người mượn</th>
                                    <th className="text-center" scope="col">Mã nhân viên</th>
                                    <th className="text-center" scope="col">Tên nhân viên</th>
                                    <th className="text-center" scope="col">Ngày mượn</th>
                                    <th className="text-center" scope="col">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {borrowPayList.map(item => {
                                    return <tr>
                                        <th scope="row" className="text-center">{item.borrowpayid}</th>

                                        <td className="text-center">{item.librarycardid}</td>
                                        <td className="text-center">
                                            {libraryCardList.map(libraryCard => {
                                                if (libraryCard.librarycardid == item.librarycardid) {
                                                    //alert(libraryCard.name)
                                                    return libraryCard.name
                                                }
                                            })}
                                        </td>

                                        <td className="text-center">{item.staffid}</td>
                                        <td className="text-center">
                                            {staffList.map(staff => {
                                                if (staff.staffid == item.staffid) {
                                                    //alert(libraryCard.name)
                                                    return staff.staffname
                                                }
                                            })}
                                        </td>
                                        <td className="text-center">{item.borrowpaydate}</td>
                                        <td className="text-center">
                                            {item.status == false ? <div>Mượn</div> : <div>Trả</div>}
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

                <Box sx={{ ...style, width: 400 }}>
                    <h3>Thêm mượn/trả sách</h3>
                    <TextField
                        id="standard-password-input"
                        label="Mã mượn"
                        type="text"
                        autoComplete="current-password"
                        variant="standard"
                        value={null}
                        onChange={null}
                        className="mb-4"
                    />

                    <Box sx={{ minWidth: 120, maxWidth: 130 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Tên sách</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={bookIDAdd}
                                label="Tên sách"
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
                            <InputLabel id="demo-simple-select-label">Tên người mượn</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={bookIDAdd}
                                label="Tên người mượn"
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
                            <InputLabel id="demo-simple-select-label">Tên nhân viên</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={bookIDAdd}
                                label="Tên nhân viên"
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
                        label="Ngày mượn"
                        type="date"
                        sx={{ width: 220 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={borrowPayDate}
                        onChange={handleChangeBorrowPayDateAdd}
                    />
                    <Box sx={{ minWidth: 120, maxWidth: 130 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Mượn/Trả</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={borrowPayStatusAdd}
                                label="Mượn/Trả"
                                onChange={handleChangeBorrowPayStatusAdd}
                            >
                                <MenuItem value={false}>Mượn</MenuItem>
                                <MenuItem value={true}>Trả</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <div className="text-danger mb-3 " id="warning-add-book"></div>
                    <Button onClick={saveBorrowBook} className="mr-2" variant="contained" endIcon={<AddIcon />}>
                        Thêm thẻ
                    </Button>

                </Box>
            </Modal>
        </div>
    )
}
export default BorrowBook