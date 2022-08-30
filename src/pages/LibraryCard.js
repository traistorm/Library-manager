import { useState } from "react";
import Navbar from "../components/Navbar"
import { useEffect } from "react";
import axios from "axios";
import { TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody, Stack, Pagination, Modal, Box, Typography, TextField, Button } from "@mui/material";
import Cookies from "js-cookie";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

function BorrowBook(props) {
    const [libraryCardList, setLibraryCardList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [maxPage, setMaxPage] = useState()
    const [itemPerPage, setItemPerPage] = useState(8)

    const [libraryCardID, setLibraryCardID] = useState()
    const [name, setName] = useState()
    const [startTime, setStartTime] = useState()
    const [finishtime, setFinishTime] = useState()

    const [libraryCardIDEdit, setLibraryCardIDEdit] = useState()
    const [libraryCardIDOldEdit, setLibraryCardIDOldEdit] = useState()
    const [nameEdit, setNameEdit] = useState()
    const [startTimeEdit, setStartTimeEdit] = useState(new Date("2017-05-24"))
    const [finishTimeEdit, setFinishTimeEdit] = useState(new Date("2017-05-24"))

    const [libraryCardIDAdd, setLibraryCardIDAdd] = useState()
    const [nameAdd, setNameAdd] = useState()
    const [startTimeAdd, setStartTimeAdd] = useState("2017-05-24")
    const [finishTimeAdd, setFinishTimeAdd] = useState("2017-05-24")

    const [isSearch, setIsSearch] = useState(false)
    const [libraryCardIDSearch, setLibraryCardIDSearch] = useState("")
    const [libraryCardNameSearch, setLibraryCardNameSearch] = useState("")


    const [openModalAddLibraryCard, setOpenModalAddLibraryCard] = useState(false)

    const [openModalConfirmDeleteLibraryCard, setOpenModalConfirmDeleteLibraryCard] = useState("");


    const handleOpenModalConfirmDeleteLibraryCard = (e, value) => {
        setOpenModalConfirmDeleteLibraryCard(true);
    }
    const handleCloseModalConfirmDeleteLibraryCard = (e, value) => {
        setOpenModalConfirmDeleteLibraryCard(false);
    }

    const handleChangeLibraryCardID = (e) => {
        setLibraryCardIDEdit(e.target.value)
    }
    const handleChangeName = (e) => {
        setNameEdit(e.target.value)
    }
    const handleChangeStartTime = (e) => {
        setStartTimeEdit(e.target.value)
    }
    const handlChangeFinishTime = (e) => {
        setFinishTimeEdit(e.target.value)
    }


    const handleChangeLibraryCardIDAdd = (e) => {
        setLibraryCardIDAdd(e.target.value)
    }
    const handleChangeNameAdd = (e) => {
        setNameAdd(e.target.value)
    }
    const handleChangeStartTimeAdd = (e) => {
        setStartTimeAdd(e.target.value)
    }
    const handlChangeFinishTimeAdd = (e) => {
        setFinishTimeAdd(e.target.value)
    }

    const handleChangelibraryCardIDSearch = (e) => {
        setLibraryCardIDSearch(e.target.value)
    }
    const handleChangelibraryCardNameSearch = (e) => {
        setLibraryCardNameSearch(e.target.value)
    }

    const handleOpenLibraryCardAddModel = () => setOpenModalAddLibraryCard(true);
    const handleCloseLibraryCardAddModel = () => setOpenModalAddLibraryCard(false);

    const [openLibraryCardEditModel, setOpenLibraryCardEditModel] = useState(false);
    const handleOpenLibraryCardEditModel = (e, data) => {
        libraryCardList.forEach(item => {
            if (item.librarycardid == e.target.dataset.librarycardid) {
                setLibraryCardIDOldEdit(item.librarycardid);
                setLibraryCardIDEdit(item.librarycardid);
                setNameEdit(item.name);
                setStartTimeEdit(item.starttime);
                setFinishTimeEdit(item.finishtime);
            }
        })
        setOpenLibraryCardEditModel(true)
    };
    const handleCloseLibraryCardEditModel = () => setOpenLibraryCardEditModel(false);

    useEffect(() => {
        //alert(id)
        if (Cookies.get('token') != "undefined") {

            axios.get("http://localhost:8080/api/v1/library-cards", { params: { page: 1, itemperpage: itemPerPage, token: Cookies.get("token") } })
                .then((res) => {
                    setMaxPage(res.data.maxPage)
                    setLibraryCardList(res.data.libraryCardList)
                    //alert()
                }, (error) => {
                    alert(error)
                })


        }
        else {

            window.location.href = "/";
        }

        //alert(res.name)
    }, []);
    const style = {
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const saveLibraryCardEdit = () => {
        if (Cookies.get('token') != "undefined") {
            var bodyFormData = new FormData();
            bodyFormData.append("librarycardidold", libraryCardIDOldEdit)
            bodyFormData.append("librarycardid", libraryCardIDEdit)
            bodyFormData.append("name", nameEdit)
            bodyFormData.append("starttime", startTimeEdit)
            bodyFormData.append("finishtime", finishTimeEdit)
            bodyFormData.append("token", Cookies.get('token'))
            //alert(startTimeEdit)
            axios.put("http://localhost:8080/api/v1/library-cards", bodyFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then((res) => {
                    window.location.href = "/library-card";

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
    const deleteLibraryCard = () => {
        if (Cookies.get('token') != "undefined") {
            axios.delete("http://localhost:8080/api/v1/library-cards", { params: { librarycardid: libraryCardIDOldEdit, token: Cookies.get("token") } })
                .then((res) => {
                    window.location.href = "/library-card";
                }, (error) => {
                    if (error.response.status == 408) {
                        window.location.href = "/";
                    }
                })
        }
        else {

        }

    }
    const addLibraryCard = () => {
        if (Cookies.get('token') != "undefined") {
            axios.post("http://localhost:8080/api/v1/login", null, { params: { token: Cookies.get('token') } })
                .then((res) => {
                    //alert()
                    if (res.status == 200) {
                        var bodyFormData = new FormData();
                        bodyFormData.append("librarycardid", libraryCardIDAdd)
                        bodyFormData.append("name", nameAdd)
                        bodyFormData.append("starttime", startTimeAdd)
                        bodyFormData.append("finishtime", finishTimeAdd)
                        bodyFormData.append("token", Cookies.get('token'))
                        //alert(finishTimeAdd)
                        axios.post("http://localhost:8080/api/v1/library-cards", bodyFormData, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        })
                            .then((res) => {
                                alert()

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
    const searchLibraryCard = () => {
        if (Cookies.get('token') != "undefined") {

            axios.post("http://localhost:8080/api/v1/library-cards/search", null, { params: { librarycardid: libraryCardIDSearch, librarycardname: libraryCardNameSearch, page: 1, itemperpage: itemPerPage, token: Cookies.get('token') } }, {

            })
                .then((res) => {
                    setLibraryCardList(res.data.libraryCardList)
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
    const handleChangePage = () => {
        const handleChangePage = (event, newPage) => {
            if (currentPage != newPage) {
                //alert()
                setCurrentPage(newPage);
                if (Cookies.get('token') != "undefined") {
                    axios.post("http://localhost:8080/api/v1/login", null, { params: { token: Cookies.get('token') } })
                        .then((res) => {
                            if (res.status == 200) {
                                if (isSearch == false) {
                                    axios.get("http://localhost:8080/api/v1/library-cards", { params: { page: newPage, itemperpage: itemPerPage } })
                                        .then(res => {
                                            setLibraryCardList(res.data.libraryCardList)
                                            setMaxPage(res.data.maxPage)
                                            //alert(Math.ceil(res.data.length / itemPerPage))
                                            //alert()
                                        })
                                }
                                else {
                                    axios.post("http://localhost:8080/api/v1/library-cards/search", null, { params: { librarycardid: libraryCardIDSearch, librarycardname: libraryCardNameSearch, page: newPage, itemperpage: itemPerPage } }, {

                                    })
                                        .then((res) => {
                                            setLibraryCardList(res.data.libraryCardList)
                                            setMaxPage(res.data.maxPage)

                                        }, (error) => {
                                            alert(error)
                                        })

                                }


                            }
                            else {
                                window.location.href = "/";
                            }
                        }, (error) => {
                            if (error.response.status == 400 || error.response.status == 401 || error.response.status == 404) {
                                window.location.href = "/"
                            }
                        })
                }
                else {

                    window.location.href = "/";
                }
            }

        };
    }
    const reloadLibraryCard = () => {
        window.location.href = "/library-card"
    }
    return (

        <div>
            <Navbar />
            <div className="row">
                <div class="col-lg-2 ml-3 mt-4">
                    <div className="border border-primary rounded p-3 mb-3">
                        <h6 className="">Tìm kiếm thẻ thư viện</h6>
                        <TextField
                            id="standard-password-input"
                            label="Mã thẻ"
                            type="text"
                            autoComplete="current-password"
                            variant="standard"
                            value={libraryCardIDSearch}
                            onChange={handleChangelibraryCardIDSearch}
                        />
                        <TextField className="mb-3"
                            id="standard-password-input"
                            label="Tên thẻ"
                            type="text"
                            autoComplete="current-password"
                            variant="standard"
                            value={libraryCardNameSearch}
                            onChange={handleChangelibraryCardNameSearch}
                        />

                        <br />
                        <Button size="small" className="mr-2" onClick={searchLibraryCard} variant="contained" endIcon={<SearchIcon />}>
                            Tìm
                        </Button>
                        <Button color="success" size="small" onClick={reloadLibraryCard} variant="contained" endIcon={<RestartAltIcon />}>
                            Tạo lại
                        </Button>

                    </div>
                    <Button onClick={handleOpenLibraryCardAddModel} variant="contained" endIcon={<AddIcon />}>
                        Thêm thẻ
                    </Button>

                </div>
                <div className="col-lg-8 ml-5">
                    <div className="row d-flex justify-content-center">
                        <h4>DANH SÁCH THẺ THƯ VIỆN</h4>
                        <table class="table table-hover table-dark">
                            <thead>
                                <tr>
                                    <th scope="col">Mã thẻ</th>
                                    <th scope="col">Tên độc giả</th>
                                    <th scope="col">Ngày nhận thẻ</th>
                                    <th scope="col">Ngày hết hạn</th>

                                </tr>
                            </thead>
                            <tbody>
                                {libraryCardList.map(item => {
                                    return <tr >
                                        <th onClick={handleOpenLibraryCardEditModel} data-librarycardid={item.librarycardid} scope="row">{item.librarycardid}</th>
                                        <th onClick={handleOpenLibraryCardEditModel} data-librarycardid={item.librarycardid} scope="row">{item.name}</th>
                                        <th onClick={handleOpenLibraryCardEditModel} data-librarycardid={item.librarycardid} scope="row">{item.starttime}</th>
                                        <th onClick={handleOpenLibraryCardEditModel} data-librarycardid={item.librarycardid} scope="row">{item.finishtime}</th>

                                    </tr>
                                })}
                            </tbody>

                        </table>
                        <Stack spacing={2}>
                            <Pagination page={currentPage} count={maxPage} onChange={handleChangePage} color="secondary" />
                        </Stack>

                    </div>

                </div>
            </div>

            <Modal
                open={openLibraryCardEditModel}
                onClose={handleCloseLibraryCardEditModel}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} style={{borderRadius: "10px"}}>
                    <Typography style={{color: "red"}} id="modal-modal-title" variant="h6" component="h2">
                        THÔNG TIN THẺ THƯ VIỆN
                    </Typography>
                    <TextField
                        id="standard-password-input"
                        label="Mã thẻ"
                        type="text"
                        autoComplete="current-password"
                        variant="standard"
                        value={libraryCardIDEdit}
                        onChange={handleChangeLibraryCardID}
                    />
                    <br></br>
                    <TextField
                        className="mb-3"
                        id="standard-password-input"
                        label="Tên"
                        type="text"
                        autoComplete="current-password"
                        variant="standard"
                        value={nameEdit}
                        onChange={handleChangeName}
                    />
                    <br></br>
                    <TextField
                        className="mb-3"
                        id="standard-password-input"
                        type="date"
                        autoComplete="current-password"
                        variant="standard"
                        value={startTimeEdit}
                        onChange={handleChangeStartTime}
                    />
                    <br></br>
                    <TextField
                        className="mb-3"
                        id="standard-password-input"
                        type="date"
                        autoComplete="current-password"
                        variant="standard"
                        value={finishTimeEdit}
                        onChange={handlChangeFinishTime}
                    />
                    <br></br>
                    <Button onClick={saveLibraryCardEdit} className="mr-2" variant="contained" endIcon={<AddIcon />}>
                        Lưu thông tin
                    </Button>
                    <Button onClick={handleOpenModalConfirmDeleteLibraryCard} className="mr-2" variant="contained" endIcon={<AddIcon />}>
                        Xoá
                    </Button>
                </Box>
            </Modal>
            <Modal
                open={openModalAddLibraryCard}
                onClose={handleCloseLibraryCardAddModel}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >

                <Box sx={{ ...style, width: 400 }}>
                    <h3>Thêm thẻ thư viện</h3>
                    <TextField
                        id="standard-password-input"
                        label="Mã thẻ"
                        type="text"
                        autoComplete="current-password"
                        variant="standard"
                        value={libraryCardIDAdd}
                        onChange={handleChangeLibraryCardIDAdd}
                    />
                    <TextField
                        id="standard-password-input"
                        label="Tên độc giả"
                        type="text"
                        autoComplete="current-password"
                        variant="standard"
                        className="mb-3"
                        value={nameAdd}
                        onChange={handleChangeNameAdd}
                    />

                    <br></br>
                    <TextField className="mb-3"
                        id="date"
                        label="Ngày mở thẻ"
                        type="date"
                        sx={{ width: 220 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={startTimeAdd}
                        onChange={handleChangeStartTimeAdd}
                    />
                    <br></br>

                    <TextField className="mb-3"
                        id="date"
                        label="Ngày hết hạn"
                        type="date"
                        sx={{ width: 220 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={finishTimeAdd}
                        onChange={handlChangeFinishTimeAdd}
                    />
                    <div className="text-danger mb-3 " id="warning-add-book"></div>
                    <Button onClick={addLibraryCard} className="mr-2" variant="contained" endIcon={<AddIcon />}>
                        Thêm thẻ
                    </Button>

                </Box>
            </Modal>
            <Modal
                open={openModalConfirmDeleteLibraryCard}
                onClose={handleCloseModalConfirmDeleteLibraryCard}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style, width: 500 }}>
                    <Typography className="" id="modal-modal-title" variant="h6" component="h2">
                        Cảnh báo
                    </Typography>
                    <Typography className="text-danger mb-4" id="modal-modal-description" sx={{ mt: 2 }}>
                        Bạn có chắc chắn muốn thẻ thư viện này?
                    </Typography>
                    <Button onClick={deleteLibraryCard} className="mr-2" variant="contained" endIcon={<AddIcon />}>
                        Xoá
                    </Button>
                    <Button onClick={handleCloseModalConfirmDeleteLibraryCard} className="mr-2" variant="contained" endIcon={<AddIcon />}>
                        Huỷ
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}
export default BorrowBook