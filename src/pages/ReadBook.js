import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Cookies from "js-cookie";
import axios from "axios";
import "../css/readBook.css"
import Navbar from "../components/Navbar";
function ReadBook() {
    const params = useParams();
    const [book, setBook] = useState();


    useEffect(() => {
        if (Cookies.get("token") != undefined) {
            axios.get("http://localhost:8080/api/v1/books/" + params.id, { params: {} })
                .then((res => {
                    setBook(res.data)
                }), (err) => {
                    alert(err)
                })
        }
        else {
            window.location.href = "/"
        }
        //alert(params.id)

    }, [])
    //alert(params.id)
    if (book == undefined) {
        return <div>Loading.......</div>
    }
    return (
        <div className="read-book-component">
            <Navbar />
            <div className="row d-flex justify-content-center">
                <div className="col-lg-12 d-flex justify-content-center ">
                    <div class="text-center text-header mb-3 mt-2">
                        <h4 class="p-3 book-title mouse-out-hover" style={{ fontSize: "25px", zIndex: "1" }}>{book.booktitle}</h4>
                    </div>
                </div>
                <div className="col-lg-8" style={{height: "70vh"}}>
                    <iframe src="https://drive.google.com/uc?export=view&id=1wu2zS5tMlKqDLgkqWWD6xi7PEIkaH7w6" width="100%" height="100%">
                    </iframe>
                </div>
            </div>

        </div>
    )
}
export default ReadBook;