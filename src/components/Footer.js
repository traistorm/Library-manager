import "../css/footer.css"
const Footer = () => {
    return (
        <footer class="page-footer mt-5">

            <div class="container-footer">

                <div class="row">

                    <div class="col-md-12 p-3">
                        <div class="d-flex justify-content-center">

                            <a class="fb-ic">
                                <i style={{color: "red"}} class="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                            </a>
                            <a class="tw-ic">
                                <i style={{color: "red"}} class="fab fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                            </a>
                            <a class="gplus-ic">
                                <i style={{color: "red"}} class="fab fa-google-plus-g fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                            </a>
                            <a class="li-ic">
                                <i style={{color: "red"}} class="fab fa-linkedin-in fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                            </a>
                            <a class="ins-ic">
                                <i style={{color: "red"}} class="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x"> </i>
                            </a>
                            <a class="pin-ic">
                                <i style={{color: "red"}} class="fab fa-pinterest fa-lg white-text fa-2x"> </i>
                            </a>
                        </div>
                    </div>

                </div>

            </div>

            <div class="footer-copyright text-center p-2 font-weight-bold">
                Hệ thống quản lý thư viện
            </div>
        </footer>
    )

}
export default Footer;