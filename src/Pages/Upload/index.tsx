import * as React from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import "./index.scss";
import { useDropzone } from "react-dropzone";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import CancelIcon from "@mui/icons-material/Cancel";
import { Link } from "react-router-dom";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import uploadClaim, { ErrorResponse } from "./uploadClaim";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import history from "../../utils/history";
import Flash from "../../Components/Flash";
import request, { AxiosError } from "axios";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 15,
  borderRadius: 0,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 0,
    backgroundColor: "#35B0F2",
  },
}));

const ProgressBar = ({ isFinish }: { isFinish: boolean }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: "70px",
      }}
    >
      <BorderLinearProgress
        sx={{ width: "550px" }}
        variant={isFinish ? "determinate" : "indeterminate"}
        value={100}
      />
      {isFinish && (
        <CheckCircleIcon sx={{ color: "#35B0F2", fontSize: "25px" }} />
      )}
    </Box>
  );
};

const UploadProgress = ({
  finishUpload,
  clearUpload,
  claimId,
}: {
  finishUpload: boolean;
  clearUpload: Function;
  claimId: string;
}) => {
  return (
    <Box
      // sx={{ background: "#4861AD" }}
      style={{ height: "100%" }}
      className="upload"
    >
      <Container
        sx={{
          pt: "60px",
          display: "flex",
          flexDirection: "column",
          flex: "1",
          justifyContent: "center",
          alignItems: "center",
        }}
        maxWidth="lg"
        style={{ height: "100%" }}
        className="patient-database"
      >
        <Paper
          sx={{
            width: "95%",
            maxWidth: "600px",
            background: "white",
            px: "70px",
            py: "60px",
            borderRadius: "15px",
            position: "relative",
          }}
          elevation={10}
        >
          <Box className="upload-progress">
            <h4>Uploading file</h4>
            <ProgressBar isFinish={finishUpload} />
            <h4>Running OCR Scanner</h4>
            <ProgressBar isFinish={finishUpload} />
            <h4>Running Fraud Detection Model</h4>
            <ProgressBar isFinish={finishUpload} />

            {finishUpload && (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  variant="contained"
                  className="upload-btn completed"
                  onClick={() => clearUpload()}
                >
                  Upload Another Claim
                </Button>
                <Button
                  variant="contained"
                  className="upload-btn completed"
                  onClick={() => history.push(`/report/${claimId}`)}
                >
                  View Result
                </Button>
                <Button
                  variant="contained"
                  className="upload-btn completed"
                  onClick={() => history.push("/claims")}
                >
                  Back to Database
                </Button>
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default function Upload() {
  const [name, setName] = React.useState("");
  const [id, setId] = React.useState("");
  const [comment, setComment] = React.useState("");
  const [files, setFiles] = React.useState<File[]>([]);
  const [uploading, setUploading] = React.useState(false);
  const [finishUpload, setFinishUpload] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [claimId, setClaimId] = React.useState("");

  const clearUpload = () => {
    setName("");
    setId("");
    setComment("");
    setFiles([]);
    setUploading(false);
    setFinishUpload(false);
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      let response = await uploadClaim(name, id, comment, files[0]);
      setClaimId(response.data.claimId);
      setFinishUpload(true);
    } catch (error) {
      setUploading(false);
      if (request.isAxiosError(error) && error.response) {
        setErrorMessage((error.response.data as ErrorResponse).msg);
      } else {
        setErrorMessage("Unknown Error");
      }
    }
  };

  if (uploading) {
    return (
      <UploadProgress
        finishUpload={finishUpload}
        clearUpload={clearUpload}
        claimId={claimId}
      />
    );
  }

  return (
    <Box style={{ height: "100%" }} className="upload">
      <Container
        sx={{
          pt: "60px",
          display: "flex",
          flexDirection: "column",
          flex: "1",
          justifyContent: "center",
          alignItems: "center",
        }}
        maxWidth="lg"
        style={{ height: "100%" }}
        className="patient-database"
      >
        <Paper
          sx={{
            width: "95%",
            maxWidth: "600px",
            background: "white",
            px: "70px",
            py: "60px",
            borderRadius: "15px",
            position: "relative",
          }}
          elevation={10}
        >
          <IconButton
            sx={{ position: "absolute", top: "25px", right: "25px" }}
            component={Link}
            to="/"
            size="large"
            className="icon-button"
          >
            <CancelIcon style={{ color: "#4861AD" }} sx={{ fontSize: 30 }} />
          </IconButton>
          <h3 className="title">Upload New Claim</h3>
          <TextField
            margin="dense"
            id="name"
            label="Patient Name"
            type="string"
            fullWidth
            variant="standard"
            value={name}
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            margin="dense"
            id="id"
            label="Patient ID"
            type="string"
            fullWidth
            variant="standard"
            value={id}
            sx={{ mb: "40px", mt: "20px" }}
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
          <FileDropzone files={files} setFiles={setFiles} />
          <TextField
            id="comments"
            label="Comments"
            multiline
            fullWidth
            variant="outlined"
            sx={{ mt: "40px" }}
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <Box sx={{ mt: "150px", display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              size="large"
              sx={{ background: "#4861AD" }}
              className="upload-btn"
              onClick={() => handleUpload()}
            >
              Upload New Claim
            </Button>
          </Box>
        </Paper>
      </Container>
      <Flash message={errorMessage}></Flash>
    </Box>
  );
}

const FileDropzone = ({
  files,
  setFiles,
}: {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}) => {
  //   const [files, setFiles] = React.useState<File[]>([]);
  let { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: (acceptedFiles) => setFiles(acceptedFiles),
  });

  if (files.length > 0) {
    return (
      <Box className="uploaded-file">
        <h3>File</h3>
        <Box
          className="uploaded-file-name"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
            }}
          >
            <InsertDriveFileIcon
              sx={{ fontSize: "30px", color: "#5A5959", mr: "18px" }}
            />
            {acceptedFiles[0].name}
          </Box>
          <IconButton
            className="icon-button"
            onClick={() => {
              setFiles([]);
            }}
          >
            <CancelIcon style={{ color: "#5A5959" }} sx={{ fontSize: 17 }} />
          </IconButton>
        </Box>
      </Box>
    );
  }

  return (
    <section className="dropzone-container">
      <input {...getInputProps()} />
      <div
        {...getRootProps({ className: "dropzone" })}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <UploadFileRoundedIcon sx={{ fontSize: 40 }} />
          <p>
            Drag and drop or{" "}
            <span style={{ textDecoration: "underline" }}>browse</span>
          </p>
        </Box>
      </div>
      {/* <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside> */}
    </section>
  );
};
