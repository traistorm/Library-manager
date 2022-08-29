import "../css/navbar.css"
import HomeIcon from '@mui/icons-material/Home';
import LocalMallIcon from '@mui/icons-material/LocalMall';
const Navbar = () => {
    return (
        <div className=''>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a href="/home"><img class="" style={{ width: '100px', height: '100px' }} src="https://images.unsplash.com/photo-1491841573634-28140fc7ced7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="img" /></a>
                
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item active" data-toggle="tooltip" data-placement="top" title="Trang chủ">
                            <a style={{ fontSize: '20px', color: "" }} class="nav-link" href="/home"><i class="fa-solid fa-house"></i> <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item active" data-toggle="tooltip" data-placement="top" title="Sách">
                            <a style={{ fontSize: '20px' }} class="nav-link" href="/book"><i class="fa-solid fa-book"></i></a>
                        </li>
                        <li class="nav-item active" data-toggle="tooltip" data-placement="top" title="Mượn/Trả Sách">
                            <a style={{ fontSize: '20px' }} class="nav-link" href="/borrow-book"><i class="fa-solid fa-hand-holding-hand"></i></a>
                        </li>
                        <li class="nav-item active" data-toggle="tooltip" data-placement="top" title="Thẻ thư viện">
                            <a style={{ fontSize: '20px' }} class="nav-link" href="/library-card"><i class="fa-regular fa-address-card"></i></a>
                        </li>
                        <li class="nav-item active" data-toggle="tooltip" data-placement="top" title="Nhân viên thư viện">
                            <a style={{ fontSize: '20px' }} class="nav-link" href="/staff"><i class="fa-solid fa-user"></i></a>

                        </li>
                        <li class="nav-item active dropdown" data-toggle="tooltip" data-placement="top" title="">
                            <a style={{ fontSize: '20px' }} class="nav-link dropbtn" href="/staff"><i class="fa-solid fa-arrow-right-from-bracket"></i></a>
                            <div>
                                <div class="dropdown-content">
                                    <a href="#">Quản lý tài khoản</a>
                                    <a href="#">Đăng xuất</a>
                                    <a href="#">Link 3</a>
                                </div>
                            </div>

                        </li>
                        {/* <div class="dropdown">
                            <div class="btn btn-secondary dropdown-toggle" type="" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fa-solid fa-arrow-right-from-bracket"></i>
                            </div>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Another action</a>
                                <a class="dropdown-item" href="#">Something else here</a>
                            </div>
                        </div> */}

                    </ul>
                </div>
            </nav>
        </div>
    )
}
export default Navbar