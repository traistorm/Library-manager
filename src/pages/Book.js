import { useState } from "react";
import Navbar from "../components/Navbar"
import { useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, TextField, Button, NativeSelect, Modal, Stack, Pagination, List, ListItem, Typography, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Cookies from "js-cookie";
import { useCallback } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import "../css/book.css"

function Book(props) {
    useEffect(() => {
        if (Cookies.get('token') != "undefined") {

            axios.get("http://localhost:8080/api/v1/books", { params: { page: currentPage, itemperpage: itemPerPage, token: Cookies.get("token") } })
                .then(res => {
                    setBookList(res.data.bookList)
                    setMaxPage(res.data.maxPage)
                    //alert(Math.ceil(res.data.length / itemPerPage))
                    //alert()
                }, error => {
                    if (error.response.status == 408) {
                        window.location.href = "/";
                    }
                })
            axios.get("http://localhost:8080/api/v1/authors")
                .then(res => {
                    setAuthorList(res.data)
                    //alert(res.data.length)
                    //alert()
                })
            axios.get("http://localhost:8080/api/v1/publishing-companies")
                .then(res => {
                    setPublishingCompanyList(res.data)
                    //alert(res.data.length)
                    //alert()
                }, error => {

                })
            axios.get("http://localhost:8080/api/v1/book-author")
                .then(res => {
                    setBookAuthorList(res.data)
                    //alert(res.data.length)
                    //alert()
                }, error => {

                })

        }
        else {

            window.location.href = "/";
        }
        //alert(id)


        //alert(res.name)
    }, []);

    const [bookIDSearch, setBookIDSearch] = useState("")
    const [bookNameSearch, setBookNameSearch] = useState("")
    const [bookList, setBookList] = useState([])
    const [fullBookList, setFullBookList] = useState([])
    const [authorList, setAuthorList] = useState([])
    const [bookAuthorList, setBookAuthorList] = useState([])
    const [authorForBookAddBookList, setAuthorForBookAddBookList] = useState([])
    const [authorForBookListEdit, setAuthorForBookListEdit] = useState([])
    const [authorForBookOldList, setAuthorForBookOldList] = useState([])
    const [publishingCompanyList, setPublishingCompanyList] = useState([])
    const [maxPage, setMaxPage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(8);
    const [isSearch, setIsSearch] = useState(false);

    const [bookTitleAddBook, setBookTitleAddBook] = useState('');
    const [bookIDAddBook, setBookIDAddBook] = useState('');
    const [viewAddBook, setViewAddBook] = useState('');
    const [remainingAddBook, setRemainingAddBook] = useState('');
    const [authorIDAddBook, setAuthorIDAddBook] = useState('');
    const [publishingCompanyIDAddBook, setPublishingCompanyIDAddBook] = useState('');
    const [publishingDateAddBook, setPublishingDateAddBook] = useState(new Date());

    const [bookTitleEditBook, setBookTitleEditBook] = useState('');
    const [bookIDEditBook, setBookIDEditBook] = useState('');
    const [bookIDOldEditBook, setBookIDOldEditBook] = useState('');
    const [viewEditBook, setViewEditBook] = useState('');
    const [remainingEditBook, setRemainingEditBook] = useState('');
    const [authorIDEditBook, setAuthorIDEditBook] = useState('');
    const [publishingCompanyIDEditBook, setPublishingCompanyIDEditBook] = useState('');
    const [publishingDateEditBook, setPublishingDateEditBook] = useState(new Date());

    const [age, setAge] = useState('');
    const [openModalEditBook, setOpenModalEditBook] = useState(false);
    const [openModalAddBook, setOpenModalAddBook] = useState(false);

    const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
    const handleCloseConfirmDeleteModal = () => {
        setOpenConfirmDeleteModal(false);
    }
    const handleOpenModalAddBook = () => {
        setOpenModalAddBook(true);
    };
    const handleCloseModalAddBook = () => {
        setOpenModalAddBook(false);
    };
    const handleOpenModalEditBook = (e, data) => {
        setAuthorForBookListEdit([])
        bookList.forEach(item => {
            if (item.bookid == e.target.dataset.bookid) {
                setBookIDOldEditBook(item.bookid);
                setBookIDEditBook(item.bookid);
                setBookTitleEditBook(item.booktitle);
                setPublishingCompanyIDEditBook(item.publishingcompanyid);
                setPublishingDateEditBook(item.publishingdate);
                //alert(item.publishingcompanyid)
                setViewEditBook(item.view);
                setRemainingEditBook(item.remainingamount);
                setAuthorIDEditBook(item.authorid);
                var authorForBookTempList = []
                bookAuthorList.forEach(bookAuthor => {
                    if (bookAuthor.bookid == item.bookid) {
                        authorList.forEach(author => {
                            if (author.authorid == bookAuthor.authorid) {
                                authorForBookTempList.push(author);
                            }
                        })
                    }
                })
                setAuthorForBookListEdit(authorForBookTempList)
                setAuthorForBookOldList(authorForBookTempList)
                //alert(publishingCompanyIDEditBook)
                setOpenModalEditBook(true);
                //alert(item.publishingcompanyid)

            }
        })

        //alert(e.target.dataset.bookid)
    };

    const deleteAuthorEditBook = (e, data) => {
        //alert(e.target.dataset.authorid)
        var authorForBookTempList = [];
        authorForBookListEdit.forEach((item, index, arr) => {
            authorForBookTempList.push(item)
        })
        authorForBookTempList.forEach((item, index, arr) => {
            if (item.authorid == e.target.dataset.authorid) {
                arr.splice(index, 1);
            }
        })
        //alert(authorForBookList.length)
        //alert(authorForBookTempList.length)
        setAuthorForBookListEdit(authorForBookTempList);
        //alert(authorForBookList[0].authorid)
        //this.forceUpdate();

    };
    const deleteAuthorAddBook = (e) => {
        var authorForBookAddBookTempList = [];
        authorForBookAddBookList.forEach((item, index, arr) => {
            authorForBookAddBookTempList.push(item)
        })
        authorForBookAddBookTempList.forEach((item, index, arr) => {
            if (item.authorid == e.target.dataset.authorid) {
                arr.splice(index, 1);
            }
        })
        //alert(authorForBookList.length)
        //alert(authorForBookTempList.length)
        setAuthorForBookAddBookList(authorForBookAddBookTempList);
    }

    const handleCloseModalEditBook = () => {
        setOpenModalEditBook(false);
    };
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };



    const handleChangeBookIDAddBook = (event) => {
        //alert(event.target.value)
        setBookIDAddBook(event.target.value);
    };
    const handleChangeTitleIDAddBook = (event) => {
        //alert(event.target.value)
        setBookTitleAddBook(event.target.value);
    };
    const handleChangeViewAddBook = (event) => {
        //alert(event.target.value)
        setViewAddBook(event.target.value);
    };
    const handleChangeRemainingAddBook = (event) => {
        //alert(event.target.value)
        setRemainingAddBook(event.target.value);
    };

    const selectPublishingCompanyAddBook = (event) => {
        setPublishingCompanyIDAddBook(event.target.value);
    };
    const selectPublishingDateAddBook = (event) => {
        setPublishingDateAddBook(event.target.value);
        //alert(event.target.value)
    };
    const handleChangeBookIDSearch = (event) => {
        //alert(event.target.value)
        setBookIDSearch(event.target.value);
    };
    const handleChangeBookNameSearch = (event) => {
        //alert(event.target.value)
        setBookNameSearch(event.target.value);
    };

    const handleChangeBookIDEditBook = (event) => {
        //alert(event.target.value)
        setBookIDEditBook(event.target.value);
    };
    const handleChangeTitleIDEditBook = (event) => {
        //alert(event.target.value)
        setBookTitleEditBook(event.target.value);
    };
    const handleChangeViewEditBook = (event) => {
        //alert(event.target.value)
        setViewEditBook(event.target.value);
    };
    const handleChangeRemainingEditBook = (event) => {
        //alert(event.target.value)
        setRemainingEditBook(event.target.value);
    };
    const selectAuthorEditBook = (e, data) => {
        //alert(e.target.dataset.authorid)
        //setAuthorIDEditBook(event.target.value);
        var authorForBookTempList = [];
        authorForBookListEdit.forEach((item, index, arr) => {
            authorForBookTempList.push(item)
        })
        var check = false;
        authorForBookTempList.forEach((item, index, arr) => {
            if (item.authorid == e.target.dataset.authorid) {
                check = true;
            }
        })
        if (check != true) {
            authorList.forEach(item => {
                if (item.authorid == e.target.dataset.authorid) {
                    authorForBookTempList.push(item)
                }
            })
        }
        setAuthorForBookListEdit(authorForBookTempList)

    };

    const selectAuthorAddBook = (e, data) => {
        //alert(e.target.dataset.authorid)
        //setAuthorIDEditBook(event.target.value);
        var authorForBookAddBookTempList = [];
        authorForBookAddBookList.forEach((item, index, arr) => {
            authorForBookAddBookTempList.push(item)
        })
        var check = false;
        authorForBookAddBookTempList.forEach((item, index, arr) => {
            if (item.authorid == e.target.dataset.authorid) {
                check = true;
            }
        })
        if (check != true) {
            authorList.forEach(item => {
                if (item.authorid == e.target.dataset.authorid) {
                    authorForBookAddBookTempList.push(item)
                }
            })
        }
        setAuthorForBookAddBookList(authorForBookAddBookTempList)

    };

    const selectPublishingCompanyEditBook = (event) => {
        //alert()
        setPublishingCompanyIDEditBook(event.target.value);
    };
    const selectPublishingDateEditBook = (event) => {
        setPublishingDateEditBook(event.target.value);
        //alert(event.target.value)
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, {
            passive: true
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const handleScroll = () => {

        const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight

        if (bottom) {
            alert()
        }
    };

    const addBook = () => {
        if (Cookies.get('token') != "undefined") {

            var bodyFormData = new FormData();
            bodyFormData.append("bookid", bookIDAddBook)
            bodyFormData.append("booktitle", bookTitleAddBook)
            bodyFormData.append("publishingcompanyid", publishingCompanyIDAddBook)
            bodyFormData.append("publishingdate", publishingDateAddBook)
            bodyFormData.append("view", viewAddBook)
            bodyFormData.append("remainingamount", remainingAddBook)
            bodyFormData.append("token", Cookies.get('token'))

            var authorIndex = 0;
            authorForBookAddBookList.forEach(author => {
                bodyFormData.append("author" + authorIndex, author.authorid)
                authorIndex++;
            })
            axios.post("http://localhost:8080/api/v1/books", bodyFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then((res) => {
                    // Add book-author
                    // document.getElementById("warning-add-book").innerHTML = "Thêm sách thất bại"
                    // document.getElementById("warning-add-book").innerHTML = "Thêm sách thành công"
                    //setBookList(res.data)
                    //this.forceUpdate()
                    //alert(res.data.length)
                    window.location.href = "/book";
                }, (error) => {
                    if (error.response.status == 408) {
                        window.location.href = "/book";
                    }
                    document.getElementById("warning-add-book").innerHTML = "Thêm sách thất bại !";

                })


        }
        else {

            window.location.href = "/";
        }
    };
    const searchBook = () => {
        //alert(currentPage)
        if (Cookies.get('token') != "undefined") {
            var formData = new FormData;
            formData.append("bookid", bookIDSearch)
            formData.append("bookname", bookNameSearch);
            formData.append("page", 1)
            formData.append("itemperpage", itemPerPage)
            formData.append("token", Cookies.get('token'))


            // axios.post("http://localhost:8080/api/v1/books/search", null, { params: { bookid: bookIDSearch, bookname: bookNameSearch, page: 1, itemperpage: itemPerPage } })
            axios.post("http://localhost:8080/api/v1/books/search", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then((res) => {
                    //alert()
                    setCurrentPage(1);
                    //setFullBookList(res.data)
                    setBookList(res.data.bookList);
                    setMaxPage(res.data.maxPage)
                    //alert(res.data.length)
                    //alert()
                }, (error) => {
                    if (error.response.status == 408) {
                        window.location.href = "/";
                    }
                })

        }
        else {

            window.location.href = "/";
        }
    };
    const saveBook = () => {
        if (Cookies.get('token') != "undefined") {
            var bodyFormData = new FormData();
            bodyFormData.append("bookidold", bookIDOldEditBook) // Id old of this book
            bodyFormData.append("bookid", bookIDEditBook) // Id new of this book
            bodyFormData.append("booktitle", bookTitleEditBook)
            bodyFormData.append("publishingcompanyid", publishingCompanyIDEditBook)
            bodyFormData.append("publishingdate", publishingDateEditBook)
            bodyFormData.append("view", viewEditBook)
            bodyFormData.append("remainingamount", remainingEditBook)
            bodyFormData.append("token", Cookies.get('token'))

            var authorIndex = 0;
            //alert(authorForBookListEdit.length)
            authorForBookListEdit.forEach(authorNew => {
                bodyFormData.append("author" + authorIndex, authorNew.authorid)
                authorIndex++;
            })
            //alert()
            axios.put("http://localhost:8080/api/v1/books", bodyFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then((res) => {
                    window.location.href = "/book";
                    // If save book success
                    //window.location.href = "/book";

                }, (error) => {
                    if (error.response.status == 408) {
                        window.location.href = "/book";
                    }
                })

        }
        else {
            window.location.href = "/";
        }

    };
    const reloadBook = () => {
        window.location.href = "/book";
    };
    const deleteBook = () => {
        if (Cookies.get('token') != "undefined") {

            axios.delete("http://localhost:8080/api/v1/books", { params: { bookid: bookIDEditBook, token: Cookies.get('token') } })
                .then(res => {

                    //alert(Math.ceil(res.data.length / itemPerPage))
                    //alert()
                    window.location.href = "/book";
                }, error => {
                    if (error.response.status == 408) {
                        window.location.href = "/book";
                    }
                })


        }
        else {

            window.location.href = "/";
        }
    }
    const handleChangePage = (event, newPage) => {

        if (currentPage != newPage) {
            //alert()
            setCurrentPage(newPage);
            if (Cookies.get('token') != "undefined") {

                if (isSearch == false) {
                    // var formData = new FormData
                    // formData.append("page", newPage);
                    // formData.append("itemperpage", itemPerPage);
                    // formData.append("token", Cookies.get('token'));
                    axios.get("http://localhost:8080/api/v1/books", { params: { "page": newPage, "itemperpage": itemPerPage, "token": Cookies.get('token') } }, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    })
                        .then(res => {
                            setBookList(res.data.bookList)
                            setMaxPage(res.data.maxPage)
                            //alert(Math.ceil(res.data.length / itemPerPage))
                            //alert()
                        }, (error) => {
                            alert(error)
                        })
                }
                else {
                    var formData = new FormData
                    formData.append("bookid", bookIDSearch);
                    formData.append("bookname", bookNameSearch);
                    formData.append("page", newPage);
                    formData.append("itemperpage", itemPerPage);
                    formData.append("token", Cookies.get('token'));

                    axios.post("http://localhost:8080/api/v1/books/search", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    })
                        .then((res) => {
                            //alert()
                            setCurrentPage(1);
                            //setFullBookList(res.data)
                            setBookList(res.data.bookList);
                            setMaxPage(res.data.maxPage)
                            //alert(res.data.length)
                        }, (error) => {
                            alert(error)
                        })
                }

            }
            else {

                window.location.href = "/";
            }
        }

    };
    const readBook = (e, data) => {
        window.location.href = "/read-book/" + e.target.dataset.bookid;
    }

    return (
        <div className="book-component">
            <Navbar />

            <div className="row">
                <div class="col-lg-2 ml-3 mt-4">
                    <div className="border border-primary rounded p-3 mb-3">
                        <h5 className="search-header mouse-out-hover p-2" style={{ fontSize: "25px", zIndex: "1" }}>Tìm kiếm sách</h5>
                        <TextField
                            id="standard-password-input"
                            label="Mã sách"
                            type="text"
                            autoComplete="current-password"
                            variant="standard"
                            onChange={handleChangeBookIDSearch}
                        />
                        <TextField className="mb-3"
                            id="standard-password-input"
                            label="Tên sách"
                            type="text"
                            autoComplete="current-password"
                            variant="standard"
                            onChange={handleChangeBookNameSearch}
                        />

                        <br />
                        <Button size="small" className="mr-1" onClick={searchBook} variant="contained" endIcon={<SearchIcon />}>
                            Tìm
                        </Button>
                        <Button color="success" size="small" onClick={reloadBook} variant="contained" endIcon={<RestartAltIcon />}>
                            Tạo lại
                        </Button>

                    </div>
                    <Button onClick={handleOpenModalAddBook} variant="contained" endIcon={<AddIcon />}>
                        Thêm sách
                    </Button>

                </div>
                <div className="col-lg-10 row d-flex justify-content-center">
                    <div class="text-center text-header mb-3 mt-2">
                        <h4 class="mouse-out-hover p-3" style={{ fontSize: "25px", zIndex: "1" }}>DANH MỤC SÁCH</h4>
                    </div>



                    <div className="row d-flex justify-content-center">
                        {bookList.map(item => (
                            <div className="col-lg-3 row d-flex justify-content-center mb-2 book-info">
                                <div class="col-lg-12 hover-opacity" style={{ position: "relative" }}>
                                    <img data-bookid={item.bookid} onClick={null} style={{ width: '100%', height: '100%', borderRadius: "10px" }} src="https://cdn.pixabay.com/photo/2015/07/27/20/16/book-863418_960_720.jpg" alt="img" />
                                    <button data-bookid={item.bookid} type="button" onClick={readBook} class="btn btn-primary button-img-1">Đọc sách</button>
                                    <button data-bookid={item.bookid} onClick={handleOpenModalEditBook} type="button" class="btn btn-success button-img-2">Thông tin</button>
                                </div>
                                <div>
                                    <div style={{ color: "red" }} className="col-lg-12 text-center font-weight-bold">Mã sách : {item.bookid}</div>
                                    <div style={{ color: "green" }} className="col-lg-12 text-center font-weight-bold">Tên sách : {item.booktitle}</div>
                                    <div style={{ color: "purple" }} className="col-lg-12 text-center font-weight-bold">Lượt xem : {item.view}</div>
                                </div>

                            </div>

                        ))}


                    </div>
                    <Stack spacing={2}>
                        <Pagination page={currentPage} count={maxPage} onChange={handleChangePage} color="secondary" />
                    </Stack>

                </div>
            </div>
            <Modal class="overflow-auto"
                open={openModalEditBook}
                onClose={handleCloseModalEditBook}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400, borderRadius: "10px" }}>
                    <h4 style={{ color: "red" }}>THÔNG TIN SÁCH</h4>
                    <TextField
                        id="standard-password-input"
                        label="Mã sách"
                        type="text"
                        autoComplete="current-password"
                        variant="standard"
                        value={bookIDEditBook}
                        onChange={handleChangeBookIDEditBook}
                        className="mb-2"
                    />
                    <TextField
                        id="standard-password-input"
                        label="Tên sách"
                        type="text"
                        autoComplete="current-password"
                        variant="standard"
                        className="mb-2"
                        value={bookTitleEditBook}
                        onChange={handleChangeTitleIDEditBook}
                    />


                    <TextField
                        id="standard-password-input"
                        label="Lượt xem"
                        type="number"
                        autoComplete="current-password"
                        variant="standard"
                        className="mb-2"
                        value={viewEditBook}
                        onChange={handleChangeViewEditBook}
                    />
                    <br></br>
                    <TextField
                        id="standard-password-input"
                        label="Số lượng còn lại"
                        type="number"
                        autoComplete="current-password"
                        variant="standard"
                        className="mb-2"
                        value={remainingEditBook}
                        onChange={handleChangeRemainingEditBook}
                    />

                    <br />
                    <Typography
                        id="decorated-list-demo"
                        level="body3"
                        textTransform="uppercase"
                        fontWeight="lg"
                        mb={1}
                        color="green"
                    >
                        Thêm tác giả
                    </Typography>
                    <FormControl sx={{ minWidth: 150 }} className="mb-2" >
                        <InputLabel id="demo-simple-select-helper-label">Tác giả</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"

                            label="Tác giả"

                        >
                            {authorList.map(item => (
                                <MenuItem data-authorid={item.authorid} onClick={selectAuthorEditBook}>
                                    {item.authorname}
                                </MenuItem>

                            ))}


                        </Select>

                    </FormControl>
                    <Typography
                        id="decorated-list-demo"
                        level="body3"
                        textTransform="uppercase"
                        fontWeight="lg"
                        mb={1}
                        color="green"
                    >
                        Danh sách tác giả hiện tại
                    </Typography>
                    <List className="mb-2"
                        aria-labelledby="decorated-list-demo"
                        sx={{ '--List-decorator-size': '32px' }}
                        style={{ maxHeight: "120px", overflowY: "auto" }}
                    >
                        {authorForBookListEdit.map(item => (
                            <ListItem>
                                {item.authorname}
                                <Button className="ml-2" data-authorid={item.authorid} onClick={deleteAuthorEditBook} variant="outlined">
                                    Xoá
                                </Button>

                            </ListItem>
                        ))}

                    </List>

                    <br />
                    <FormControl sx={{ minWidth: 150 }} className="mb-2">
                        <InputLabel id="demo-simple-select-helper-label">Nhà xuất bản</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={publishingCompanyIDEditBook}
                            label="Nhà xuất bản"
                            onChange={selectPublishingCompanyEditBook}
                        >
                            {publishingCompanyList.map(item => (
                                <MenuItem value={item.publishingcompanyid}>{item.publishingcompanyname}</MenuItem>
                            ))}


                        </Select>

                    </FormControl>

                    <TextField className="mb-2"
                        id="date"
                        label="Ngày xuất bản"
                        type="date"
                        defaultValue="2017-05-24"
                        sx={{ width: 220 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={publishingDateEditBook}
                        onChange={selectPublishingDateEditBook}
                    />
                    <Button className="mr-2" variant="contained" endIcon={<AddIcon />} onClick={saveBook}>
                        Lưu thông tin
                    </Button>
                    <Button color="error" variant="contained" endIcon={<DeleteIcon />} onClick={() => {
                        setOpenConfirmDeleteModal(true)
                    }}>
                        Xoá sách
                    </Button>
                </Box>
            </Modal>
            <Modal
                open={openModalAddBook}
                onClose={handleCloseModalAddBook}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >

                <Box sx={{ ...style, width: 400, borderRadius: "10px" }}>
                    <h3 style={{ color: "red" }}>Thêm sách</h3>
                    <TextField
                        id="standard-password-input"
                        label="Mã sách"
                        type="text"
                        autoComplete="current-password"
                        variant="standard"
                        value={bookIDAddBook}
                        onChange={handleChangeBookIDAddBook}
                    />
                    <TextField
                        id="standard-password-input"
                        label="Tên sách"
                        type="text"
                        autoComplete="current-password"
                        variant="standard"
                        className="mb-2"
                        value={bookTitleAddBook}
                        onChange={handleChangeTitleIDAddBook}
                    />


                    <TextField
                        id="standard-password-input"
                        label="Lượt xem"
                        type="number"
                        autoComplete="current-password"
                        variant="standard"
                        className="mb-2"
                        value={viewAddBook}
                        onChange={handleChangeViewAddBook}
                    />
                    <br></br>
                    <TextField
                        id="standard-password-input"
                        label="Số lượng còn lại"
                        type="number"
                        autoComplete="current-password"
                        variant="standard"
                        className="mb-4"
                        value={remainingAddBook}
                        onChange={handleChangeRemainingAddBook}
                    />

                    <br />
                    <Typography
                        id="decorated-list-demo"
                        level="body3"
                        textTransform="uppercase"
                        fontWeight="lg"
                        mb={1}
                        color="green"
                    >
                        Thêm tác giả
                    </Typography>
                    <FormControl sx={{ minWidth: 150 }} className="mb-3" >
                        <InputLabel id="demo-simple-select-helper-label">Tác giả</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"

                            label="Tác giả"

                        >
                            {authorList.map(item => (
                                <MenuItem data-authorid={item.authorid} onClick={selectAuthorAddBook}>
                                    {item.authorname}
                                </MenuItem>

                            ))}


                        </Select>

                    </FormControl>
                    <Typography
                        id="decorated-list-demo"
                        level="body3"
                        textTransform="uppercase"
                        fontWeight="lg"
                        mb={1}
                        color="green"
                    >
                        Danh sách tác giả hiện tại
                    </Typography>
                    <List className=""
                        aria-labelledby="decorated-list-demo"
                        sx={{ '--List-decorator-size': '32px' }}
                        style={{ maxHeight: "120px", overflowY: "auto" }}
                    >
                        {authorForBookAddBookList.map(item => (
                            <ListItem>
                                {item.authorname}
                                <Button className="ml-2" data-authorid={item.authorid} onClick={deleteAuthorAddBook} variant="outlined">
                                    Xoá
                                </Button>

                            </ListItem>
                        ))}

                    </List>

                    <br />
                    <FormControl sx={{ minWidth: 150 }} className="mb-3">
                        <InputLabel id="demo-simple-select-helper-label">Nhà xuất bản</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={publishingCompanyIDAddBook}
                            label="Nhà xuất bản"
                            onChange={selectPublishingCompanyAddBook}
                        >
                            {publishingCompanyList.map(item => (
                                <MenuItem value={item.publishingcompanyid}>{item.publishingcompanyname}</MenuItem>
                            ))}


                        </Select>

                    </FormControl>

                    <TextField className="mb-3"
                        id="date"
                        label="Ngày xuất bản"
                        type="date"
                        defaultValue="2017-05-24"
                        sx={{ width: 220 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={publishingDateAddBook}
                        onChange={selectPublishingDateAddBook}
                    />
                    <div className="text-danger mb-3 " id="warning-add-book"></div>
                    <Button onClick={addBook} className="mr-2" variant="contained" endIcon={<AddIcon />}>
                        Thêm sách
                    </Button>

                </Box>
            </Modal>
            <Modal
                open={openConfirmDeleteModal}
                onClose={handleCloseConfirmDeleteModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style, width: 500 }}>
                    <Typography className="" id="modal-modal-title" variant="h6" component="h2">
                        Cảnh báo
                    </Typography>
                    <Typography className="text-danger mb-4" id="modal-modal-description" sx={{ mt: 2 }}>
                        Bạn có chắc chắn muốn xoá sách này?
                    </Typography>
                    <Button onClick={deleteBook} className="mr-2" variant="contained" endIcon={<AddIcon />}>
                        Xoá
                    </Button>
                    <Button onClick={handleCloseConfirmDeleteModal} className="mr-2" variant="contained" endIcon={<AddIcon />}>
                        Huỷ
                    </Button>
                </Box>
            </Modal>
        </div>
    )
}
export default Book