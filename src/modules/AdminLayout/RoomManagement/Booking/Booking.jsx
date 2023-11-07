import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
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
  Tooltip,
  Typography,
} from "@mui/material";
import { StyledTableCell, StyledTableRow } from "./index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRoomisBooked } from "../../../../APIs/roomApi";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import Loading from "../../../../Components/Loading";
import { removeBooked } from "../../../../APIs/roomApi";
import { ModalContent, ModalWidth } from "../../../../Components/Modal";
import { ButtonCustom, ButtonMain } from "../../../../Components/Button";
import AddBooking from "./AddBooking/AddBooking";
import UpdateBooking from "./UpdateBooking";
import dayjs from "dayjs";

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

export default function Booking() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [openAddUser, setOpenAddUser] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedBooked, setSelectedBooked] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [openStack, setOpenStack] = useState(false);

  const queryClient = useQueryClient();

  const { data: listBooked = [], isLoading } = useQuery({
    queryKey: ["listBooked"],
    queryFn: getRoomisBooked,
  });

  const { mutate: handleDeleteUser } = useMutation({
    mutationFn: (id) => removeBooked(id),
    onSuccess: () => {
      setOpenStack(true);
      queryClient.invalidateQueries({ queryKey: ["listBooked"] });
    },
  });

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listBooked.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteAndReload = () => {
    handleDeleteUser(selectedBooked);
    setOpenDelete(false);
  };

  const handleCloseStack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenStack(false);
  };

  const filterUsers = () => {
    let filteredData = listBooked.filter((room) =>
      room.maPhong.toString().includes(searchQuery.toString())
    );

    setFilteredUsers(filteredData);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleEnterKeyDown = (event) => {
    if (event.key === "Enter") {
      filterUsers();
    }
  };

  useEffect(() => {
    if (listBooked) {
      setFilteredUsers(listBooked);
    }
  }, [listBooked]);

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
            label="Tìm kiếm tài khoản theo mã phòng"
            id="fullWidth"
            color="secondary"
            value={searchQuery}
            onChange={handleSearchInputChange}
            onKeyDown={handleEnterKeyDown}
          />
          <Button
            variant="contained"
            color="info"
            onClick={() => {
              filterUsers();
            }}
          >
            <SearchIcon />
          </Button>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setOpenAddUser(true);
          }}
        >
          Thêm Đặt Phòng
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
                Mã Phòng
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                Ngày Đến
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                Ngày Đi
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                Số Lượng Khách
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
            ).map((room) => (
              <StyledTableRow key={room.id}>
                <StyledTableCell>{room.id}</StyledTableCell>
                <StyledTableCell>{room.maPhong}</StyledTableCell>
                <StyledTableCell>
                  {dayjs(room.ngayDen).format("DD/MM/YYYY")}
                </StyledTableCell>
                <StyledTableCell>
                  {dayjs(room.ngayDi).format("DD/MM/YYYY")}
                </StyledTableCell>
                <StyledTableCell>{room.soLuongKhach}</StyledTableCell>
                <StyledTableCell>{room.maNguoiDung}</StyledTableCell>
                <StyledTableCell>
                  <Box>
                    <Tooltip title="chỉnh sửa" placement="top">
                      <IconButton
                        size="large"
                        onClick={() => {
                          setOpen(true);
                          setSelectedBooked(room.id);
                        }}
                      >
                        <EditIcon fontSize="inherit" color="primary" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Xóa đặt phòng" placement="bottom">
                      <IconButton
                        size="large"
                        onClick={() => {
                          setOpenDelete(true);
                          setSelectedBooked(room.id);
                        }}
                      >
                        <DeleteIcon fontSize="inherit" color="error" />
                      </IconButton>
                    </Tooltip>
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
                count={listBooked.length}
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
        aria-labelledby="modal-modal-ftitle"
        aria-describedby="modal-modal-description"
      >
        <ModalWidth>
          {/* Hiển thị form hoặc nội dung modal */}
          <UpdateBooking
            onClose={() => {
              setOpen(false);
            }}
            userId={selectedBooked}
          />
        </ModalWidth>
      </Modal>

      {/* Modal add user */}
      <Modal
        open={openAddUser}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalWidth>
          <AddBooking
            onClose={() => {
              setOpenAddUser(false);
            }}
          />
        </ModalWidth>
      </Modal>

      {/* Modal hiển thị thông báo xác nhận xóa */}
      <Modal
        open={openDelete}
        onClose={() => {
          setOpenDelete(false);
        }}
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
            Bạn có chắc chắn xóa phòng này?
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
          autoHideDuration={3000}
          onClose={handleCloseStack}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
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
