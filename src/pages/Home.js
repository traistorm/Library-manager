import { useState } from "react";
import Navbar from "../components/Navbar"
import { useEffect } from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import {
    MDBCarousel,
    MDBCarouselInner,
    MDBCarouselItem,
    MDBCarouselElement,
    MDBCarouselCaption,
} from 'mdb-react-ui-kit';

import Cookies from "js-cookie";
import "../css/home.css"
function Home(props) {
    const [bookTopViewList, setBookTopViewList] = useState([])
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    useEffect(() => {
        if (Cookies.get('token') != "undefined") {
            axios.post("http://localhost:8080/api/v1/login", null, { params: { token: Cookies.get('token') } })
                .then((res) => {
                    //alert()
                    if (res.status == 200) {
                        axios.get("http://localhost:8080/api/v1/books/top-views", { params: { number: 3 } })
                            .then(res => {
                                setBookTopViewList(res.data)
                                //alert()
                            })
                    }
                    else {
                        window.location.href = "/";
                    }
                    //alert()
                }, (error) => {
                    alert(error)
                    window.location.href = "/"
                    // if (error.response.status == 400 || error.response.status == 401 || error.response.status == 404) {
                    //     window.location.href = "/"
                    // }
                })
        }
        else {

            window.location.href = "/";
        }
        //alert(id)


        //alert(res.name)
    }, []);
    const readBook = (e, data) => {
        window.location.href = "/read-book/" + e.target.dataset.bookid;
    }
    return (
        <div className="home-component">
            <Navbar />

            <div className="row d-flex justify-content-center">
                <div className="col-lg-8 row d-flex justify-content-center">
                    <h3 className="mt-4 mb-4 header-1 slide-text mouse-out-hover p-2" style={{ color: "green", fontSize: "30px", borderRadius: "10px", zIndex: "1" }}>HỆ THỐNG QUẢN LÝ THƯ VIỆN</h3>

                    <div className="col-lg-8 d-flex justify-content-center">
                        <MDBCarousel showIndicators showControls>
                            <MDBCarouselInner>
                                <MDBCarouselItem style={{height: "350px", width : "1000px"}} className='active'>
                                    <MDBCarouselElement src='https://images5.alphacoders.com/837/thumbbig-837878.webp' alt='...' />
                                </MDBCarouselItem>
                                <MDBCarouselItem style={{height: "350px", width : "1000px"}}>
                                    <MDBCarouselElement src='https://images2.alphacoders.com/112/thumbbig-112972.webp' alt='...' />
                                </MDBCarouselItem>
                                <MDBCarouselItem style={{height: "350px", width : "1000px"}}>
                                    <MDBCarouselElement src='https://images.alphacoders.com/861/thumbbig-86131.webp' alt='...' />
                                </MDBCarouselItem>
                            </MDBCarouselInner>
                        </MDBCarousel>
                        {/* <img className="" src="https://cdn.pixabay.com/photo/2016/03/26/22/21/books-1281581_960_720.jpg" alt="img" /> */}
                    </div>
                    <div className="col-lg-12 d-flex justify-content-center">
                        <h3 class="col-lg-12" className="mt-4 mb-4 mouse-out-hover p-2" style={{ color: "blue", fontSize: "30px", borderRadius: "10px", zIndex: "1" }}>Lượt xem cao nhất</h3>
                    </div>

                    <div class="col-lg-12 row ">
                        {bookTopViewList.map(item => (
                            <div class="col-lg-4">
                                <div class="col-lg-12 hover-opacity" style={{ position: "relative" }}>
                                    <img data-bookid={null} onClick={null} style={{ width: '100%', height: '100%', borderRadius: "10px" }} src="https://cdn.pixabay.com/photo/2015/07/27/20/16/book-863418_960_720.jpg" alt="img" />
                                    <button data-bookid={item.bookid} onClick={readBook} type="button" class="btn btn-primary button-img-1-home">Đọc sách</button>

                                </div>
                                <div>
                                    <div style={{ color: "green", fontSize: "17px" }} className="col-lg-12 text-center font-weight-bold">Tên sách : {item.booktitle}</div>
                                    <div style={{ color: "red", fontSize: "18px" }} className="col-lg-12 text-center font-weight-bold">Lượt xem : {item.view}</div>
                                </div>
                            </div>
                        ))}


                    </div>

                </div>

            </div>
        </div>
    )
}
export default Home