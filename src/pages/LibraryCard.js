import { useState } from "react";
import Navbar from "../components/Navbar"
import { useEffect } from "react";
import axios from "axios";
import { TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody, Stack, Pagination, Modal, Box, Typography, TextField, Button } from "@mui/material";
import Cookies from "js-cookie";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import "../css/library-card.css"
import Footer from "../components/Footer";


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
            axios.post('http://localhost:8080/api/v1/login', null, { params: { token: Cookies.get('token') } })
                .then(res => {
                    if (res.data.token.role != "admin") {
                        window.location.href = "/home-user"
                    }

                },
                    error => {
                        alert(error);
                    })
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

        <div className="library-card-component">
            <Navbar />
            <div className="row" style={{ height: "70vh" }}>
                <div class="col-lg-2 ml-3 mt-4">
                    <div className="border border-primary rounded p-3 mb-3">
                        <h6 className="mouse-out-hover p-2" style={{ fontSize: "18px", zIndex: 1, color: "blue" }}>T??m ki???m th??? th?? vi???n</h6>
                        <TextField
                            id="standard-password-input"
                            label="M?? th???"
                            type="text"
                            autoComplete="current-password"
                            variant="standard"
                            value={libraryCardIDSearch}
                            onChange={handleChangelibraryCardIDSearch}
                        />
                        <TextField className="mb-3"
                            id="standard-password-input"
                            label="T??n th???"
                            type="text"
                            autoComplete="current-password"
                            variant="standard"
                            value={libraryCardNameSearch}
                            onChange={handleChangelibraryCardNameSearch}
                        />

                        <br />
                        <Button size="small" className="mr-2" onClick={searchLibraryCard} variant="contained" endIcon={<SearchIcon />}>
                            T??m
                        </Button>
                        <Button color="success" size="small" onClick={reloadLibraryCard} variant="contained" endIcon={<RestartAltIcon />}>
                            T???o l???i
                        </Button>

                    </div>
                    <Button onClick={handleOpenLibraryCardAddModel} variant="contained" endIcon={<AddIcon />}>
                        Th??m th???
                    </Button>

                </div>
                <div className="col-lg-8 ml-5">
                    <div className="row d-flex justify-content-center">
                        <h4 className="mt-4 mb-4 mouse-out-hover p-2" style={{ fontSize: "25px", zIndex: 1, color: "blue" }}>DANH S??CH TH??? TH?? VI???N</h4>
                        <table class="table table-hover table-dark">
                            <thead>
                                <tr>
                                    <th className="text-center" scope="col">M?? th???</th>
                                    <th className="text-center" scope="col">T??n ?????c gi???</th>
                                    <th className="text-center" scope="col">Ng??y nh???n th???</th>
                                    <th className="text-center" scope="col">Ng??y h???t h???n</th>

                                </tr>
                            </thead>
                            <tbody>
                                {libraryCardList.map(item => {
                                    return <tr >
                                        <th className="text-center" onClick={handleOpenLibraryCardEditModel} data-librarycardid={item.librarycardid} scope="row">{item.librarycardid}</th>
                                        <th className="text-center" onClick={handleOpenLibraryCardEditModel} data-librarycardid={item.librarycardid} scope="row">{item.name}</th>
                                        <th className="text-center" onClick={handleOpenLibraryCardEditModel} data-librarycardid={item.librarycardid} scope="row">{item.starttime}</th>
                                        <th className="text-center" onClick={handleOpenLibraryCardEditModel} data-librarycardid={item.librarycardid} scope="row">{item.finishtime}</th>

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
                <Box sx={style} style={{ borderRadius: "10px" }}>
                    <Typography style={{ color: "red" }} id="modal-modal-title" variant="h6" component="h2">
                        TH??NG TIN TH??? TH?? VI???N
                    </Typography>
                    <TextField
                        id="standard-password-input"
                        label="M?? th???"
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
                        label="T??n"
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
                        L??u th??ng tin
                    </Button>
                    <Button onClick={handleOpenModalConfirmDeleteLibraryCard} color="error" className="mr-2" variant="contained" endIcon={<DeleteIcon />}>
                        Xo??
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
                    <h3>Th??m th??? th?? vi???n</h3>
                    <TextField
                        id="standard-password-input"
                        label="M?? th???"
                        type="text"
                        autoComplete="current-password"
                        variant="standard"
                        value={libraryCardIDAdd}
                        onChange={handleChangeLibraryCardIDAdd}
                    />
                    <TextField
                        id="standard-password-input"
                        label="T??n ?????c gi???"
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
                        label="Ng??y m??? th???"
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
                        label="Ng??y h???t h???n"
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
                        Th??m th???
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
                        C???nh b??o
                    </Typography>
                    <Typography className="text-danger mb-4" id="modal-modal-description" sx={{ mt: 2 }}>
                        B???n c?? ch???c ch???n mu???n th??? th?? vi???n n??y?
                    </Typography>
                    <Button onClick={deleteLibraryCard} className="mr-2" variant="contained" endIcon={<AddIcon />}>
                        Xo??
                    </Button>
                    <Button onClick={handleCloseModalConfirmDeleteLibraryCard} className="mr-2" variant="contained" endIcon={<AddIcon />}>
                        Hu???
                    </Button>
                </Box>
            </Modal>
            <Footer />
        </div>
    )
}
export default BorrowBook