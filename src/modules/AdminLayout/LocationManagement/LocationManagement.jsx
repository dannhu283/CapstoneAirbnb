import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
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
  Tooltip,
} from "@mui/material";
import { StyledTableCell, StyledTableRow } from "./index";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
// import UpdateUser from "./UpdateUser/UpdateUser";
import { ModalContent, ModalWidth } from "../../../Components/Modal";
import { ButtonCustom, ButtonMain } from "../../../Components/Button";
import { getLocation, removeLocation } from "../../../APIs/locationApi";
import AddLocation from "./AddLocation";
import UpdateLocation from "./UpdateLocation";

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

export default function LocationManagement() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [openAddLocation, setOpenAddLocation] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLocation, setFilteredLocation] = useState([]);
  const [openStack, setOpenStack] = useState(false);

  const queryClient = useQueryClient();

  const { data: location = [], isLoading } = useQuery({
    queryKey: ["location"],
    queryFn: getLocation,
  });

  const { mutate: handleDeleteLocation } = useMutation({
    mutationFn: (id) => removeLocation(id),
    onSuccess: () => {
      setOpenStack(true);
      queryClient.invalidateQueries({ queryKey: ["location"] });
    },
  });

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - location.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteAndReload = () => {
    handleDeleteLocation(selectedLocation);
    setOpenDelete(false);
  };

  const handleCloseStack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenStack(false);
  };

  // Function to filter users based on search query
  const filterLocations = () => {
    const filteredData = location.filter((location) =>
      location.tenViTri.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredLocation(filteredData);
  };

  // Attach an event handler to update searchQuery when the input value changes
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleEnterKeyDown = (event) => {
    if (event.key === "Enter") {
      filterLocations();
    }
  };

  useEffect(() => {
    if (location) {
      setFilteredLocation(location); // Ban đầu, filteredLocation bằng danh sách customers
    }
  }, [location]);

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
            label="Tìm kiếm theo vị trí"
            id="fullWidth"
            color="secondary"
            value={searchQuery}
            onChange={handleSearchInputChange} // Handle input change
            onKeyDown={handleEnterKeyDown}
          />
          <Button
            variant="contained"
            color="info"
            onClick={() => {
              filterLocations();
            }}
          >
            <SearchIcon />
          </Button>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setOpenAddLocation(true);
          }}
        >
          Thêm vị trí
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="infor pagination table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                Mã vị trí
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                Tên
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                Hình Ảnh
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                Quốc gia
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                Tỉnh Thành
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                Thao tác
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredLocation.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : filteredLocation
            ).map((location) => (
              <StyledTableRow key={location.id}>
                <StyledTableCell>{location.id}</StyledTableCell>
                <StyledTableCell>{location.tenViTri}</StyledTableCell>
                <StyledTableCell>
                  <img src={location.hinhAnh} width={50} height={50} alt="" />
                </StyledTableCell>
                <StyledTableCell>{location.quocGia}</StyledTableCell>
                <StyledTableCell>{location.tinhThanh}</StyledTableCell>
                <StyledTableCell>
                  <Box>
                    <Tooltip title="chỉnh sửa" placement="top">
                      <IconButton
                        aria-label="update"
                        size="large"
                        onClick={() => {
                          setOpen(true);
                          setSelectedLocation(location.id);
                        }}
                      >
                        <EditIcon fontSize="inherit" color="primary" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa vị trí" placement="bottom">
                      <IconButton
                        aria-label="delete"
                        size="large"
                        onClick={() => {
                          setOpenDelete(true);
                          setSelectedLocation(location.id);
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
                count={location.length}
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
          <UpdateLocation
            onClose={() => {
              setOpen(false);
            }}
            locationId={selectedLocation}
          />
        </ModalWidth>
      </Modal>

      {/* Modal add user */}
      <Modal
        open={openAddLocation}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalWidth>
          <AddLocation
            onClose={() => {
              setOpenAddLocation(false);
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
