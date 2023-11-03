import React, { useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Modal,
  TextField,
  Typography,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  Alert,
  Snackbar,
  Stack,
  TableHead,
} from "@mui/material";
import { StyledTableCell, StyledTableRow } from "./index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getInfor } from "../../../APIs/userApi";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import Loading from "../../../Components/Loading";
// import UserModal from "./UpdateUser";
import { removeUser } from "../../../APIs/userApi";
import { ModalContent } from "../../../Components/Modal";
import { ButtonCustom, ButtonMain } from "../../../Components/Button";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function UserManagement() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [openAddUser, setOpenAddUser] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [userName, setUserName] = useState("");
  const [infoUser, setInfoUser] = useState({});
  const [isLoadingInfoUser, setIsLoadingInfoUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [openStack, setOpenStack] = useState(false);

  const queryClient = useQueryClient();

  const { data: infors = [], isLoading } = useQuery({
    queryKey: ["infors"],
    queryFn: getInfor,
  });
  console.log(infors);

  const { mutate: handleDeleteUser } = useMutation({
    mutationFn: (id) => removeUser(id),
    onSuccess: () => {
      handleClick();
      queryClient.invalidateQueries({ queryKey: ["infors"] });
    },
  });

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - infors.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpen = (username) => {
    setUserName(username);
    setIsLoadingInfoUser(true); // Bắt đầu tải dữ liệu
    setOpen(true);
  };

  const handleClose = () => {
    setUserName("");
    setOpen(false);
    setOpenBackdrop(false);
  };

  const handleOpenAddUser = () => {
    setOpenAddUser(true);
  };

  const handleCloseAddUser = () => {
    setOpenAddUser(false);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDeleteAndReload = () => {
    handleDeleteUser(selectedUser);
    setOpenDelete(false);
  };

  const handleClick = () => {
    setOpenStack(true);
  };

  const handleCloseStack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenStack(false);
  };

  // Function to filter users based on search query
  const filterUsers = () => {
    const filteredData = infors.filter((infor) =>
      infor.taiKhoan.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filteredData);
  };

  const handleSearch = () => {
    filterUsers();
  };

  // Attach an event handler to update searchQuery when the input value changes
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Sự kiện xử lý khi nhấn phím "Enter" trong trường đầu vào tìm kiếm
  const handleEnterKeyDown = (event) => {
    if (event.key === "Enter") {
      filterUsers();
    }
  };

  // React.useEffect(() => {
  //   if (userName) {
  //     setIsLoadingInfoUser(true);
  //     setOpenBackdrop(true);
  //     // Gọi API để lấy infoUser khi userName đã có giá trị
  //     getInfoUser(userName).then((data) => {
  //       setInfoUser(data);
  //       setIsLoadingInfoUser(false); // Dừng trạng thái tải
  //     });
  //   }
  // }, [userName]);

  React.useEffect(() => {
    if (infors) {
      //  setInitialData(customers);
      setFilteredUsers(infors); // Ban đầu, filteredUsers bằng danh sách customers
    }
  }, [infors]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Box height={100} />
      <Box display={"flex"} justifyContent={"right"} mb={2}>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            marginRight: "16px",
            display: "flex",
          }}
        >
          <TextField
            fullWidth
            label="Tìm kiếm tài khoản"
            id="fullWidth"
            color="secondary"
            value={searchQuery}
            onChange={handleSearchInputChange} // Handle input change
            onKeyDown={handleEnterKeyDown}
          />
          <Button variant="contained" color="info" onClick={handleSearch}>
            <SearchIcon />
          </Button>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOpenAddUser}
        >
          Thêm người dùng
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="infor pagination table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                ID
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                Email
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                Tên
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                Ngày Sinh
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                Mã người dùng
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                Chức năng
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredUsers.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : filteredUsers
            ).map((infor) => (
              <StyledTableRow key={infor.id}>
                <StyledTableCell>{infor.id}</StyledTableCell>
                <StyledTableCell>{infor.email}</StyledTableCell>
                <StyledTableCell>{infor.name}</StyledTableCell>
                <StyledTableCell>{infor.birthday}</StyledTableCell>
                <StyledTableCell>{infor.role}</StyledTableCell>
                <StyledTableCell>
                  <Box>
                    <IconButton
                      aria-label="update"
                      size="large"
                      onClick={() => {
                        handleOpen(infor.taiKhoan);
                      }}
                    >
                      <EditIcon fontSize="inherit" color="primary" />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      size="large"
                      onClick={() => {
                        setOpenDelete(true);
                        setSelectedUser(infor.id);
                      }}
                    >
                      <DeleteIcon fontSize="inherit" color="error" />
                    </IconButton>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <StyledTableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={6}
                count={infors.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {/* Modal update user */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {isLoadingInfoUser ? (
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={openBackdrop}
          >
            <CircularProgress color="inherit" />
          </Backdrop> // Hiển thị trạng thái tải
        ) : (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 1000,
              height: 400,
              bgcolor: "background.paper",
              border: "1px solid #fff",
              boxShadow: 24,
              p: 4,
            }}
          >
            {/* Hiển thị form hoặc nội dung modal */}
            {/* <UserModal infoUser={infoUser} onClose={handleClose} /> */}
          </Box>
        )}
      </Modal>

      {/* Modal add user */}
      <Modal
        open={openAddUser}
        onClose={handleCloseAddUser}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 1000,
            height: 400,
            bgcolor: "background.paper",
            border: "1px solid #fff",
            boxShadow: 24,
            p: 4,
          }}
        >
          {/* Hiển thị form hoặc nội dung modal */}
          {/* <AddUser onClose={handleCloseAddUser} /> */}
        </Box>
      </Modal>

      {/* Modal hiển thị thông báo xác nhận xóa */}
      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        sx={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: " rgba(0, 0, 0, 0.6)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "12",
        }}
      >
        <ModalContent>
          <img
            style={{ width: "120px", marginTop: "10px" }}
            src="/img/animation_lnov06bj_small.gif"
            alt="confirm"
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginBottom: "40px",
              color: " #f43f5e",
            }}
          >
            Bạn có chắc chắn xóa tài khoản?
          </Typography>

          <ButtonMain onClick={handleDeleteAndReload}>Xác nhận</ButtonMain>
          <ButtonCustom
            onClick={() => {
              setOpenDelete(false);
            }}
          >
            Hủy
          </ButtonCustom>
        </ModalContent>
      </Modal>

      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={openStack}
          autoHideDuration={6000}
          onClose={handleCloseStack}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseStack}
            severity="success"
            sx={{ width: "100%" }}
          >
            Xóa thành công!
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}
