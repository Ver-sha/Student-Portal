import React, { useEffect, useState } from "react";
import {
  Box, Button, Checkbox, Divider, Drawer, Paper,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TextField
} from "@mui/material";


const Subject = () => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const [openDrawer, setOpenDrawer] = useState("");
  const [subjectList, setSubjectList] = useState([]);
  const [editSubject, setEditSubject] = useState({});
  const [subError , setSubError] = useState("");
  const [levelError , setLevelError] = useState("");


  //add new subject
  const addSubject = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const date = new Date();
    const id = date.getTime();

    const formData = {
      id: id,
      subject: form.subject.value,
      level: form.level.value,
    }
    const subValid = formData.subject;
    const levelValid = formData.level;
    if(subValid && levelValid){
      setSubError("")
      setLevelError("")
      const newData = [...subjectList, formData];
      window.localStorage.setItem("SubjectData", JSON.stringify(newData));
      setSubjectList(newData);
      setOpenDrawer("")
    }
    else{
      setSubError(!subValid ? "please enter at least 1 subject" : "")
      setLevelError(!levelValid ? "please enter at least 1 level" : "")
    }
   
  }
  //to stay data after refresh as well ,get local items
  useEffect(() => {
    const getStringData = window.localStorage.getItem("SubjectData");
    if (getStringData) {
      return setSubjectList(JSON.parse(getStringData));
    }
  }, []);

  ////

  //edit subject
  // edit pop up opens
  const handleEditClick = (subject) => {
    setEditSubject(subject)
    setOpenDrawer("edit-form")
  }

  //edit subject entry
  const editSubjectEntry = (e) => {
    debugger
    e.preventDefault();
    const updateSubject = subjectList.map((subject) => {
      debugger
      if (subject.id === editSubject.id) {
        debugger
        return editSubject;
      }
      else {
        return subject;
      }
    })
    setSubjectList(updateSubject);
    window.localStorage.setItem("SubjectData", JSON.stringify(updateSubject));
    setOpenDrawer("");
    console.log(updateSubject);
  }


  ////

  // delete entry
  const deleteEntry = (id) => {
    const deletedata = subjectList.filter((subject) => {
      if (subject.id === id) {
        debugger
        return false;
      }
      else {
        debugger
        return true;
      }
    })
    setSubjectList(deletedata)
    window.localStorage.setItem("SubjectData", JSON.stringify(deletedata))
    console.log(deletedata);
  }


  ////
  return (
    <>
      <Paper>
        <Box>
          <Box sx={{
            textAlign: "center",
            padding: "20px",

          }} component={"h1"}> Subject List</Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 2 }}>
            <Box sx={{ mt: 3, px: 2 }}> <Button variant="contained"> Select All
              {/* <Checkbox {...label} />   */}
            </Button>
            </Box>
            <Box sx={{ textAlign: "end", padding: "10px" }}>
              <Button variant="contained" onClick={(e) => { setOpenDrawer("add-form") }}> Add New Subject</Button>
            </Box>
          </Box>
        </Box>
        <Divider />

        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell variant="head">Select </TableCell>
                  <TableCell> Sr No.</TableCell>
                  <TableCell variant="head">Subject Name</TableCell>
                  <TableCell variant="head">Level</TableCell>
                  <TableCell variant="head">Action</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {subjectList.map((subject, i) => {
                  return <TableRow
                    key={i} >
                    <TableCell><Checkbox {...label} /> </TableCell>
                    <TableCell>{i + 1} </TableCell>
                    <TableCell>{subject.subject}</TableCell>
                    <TableCell>{subject.level}</TableCell>

                    <TableCell>
                      <Button sx={{ margin: "4px 5px" }} variant="contained" onClick={(e) => { handleEditClick(subject) }}>edit</Button>
                      <Button sx={{ margin: "4px 5px" }} variant="contained" onClick={(e) => { deleteEntry(subject.id) }}>delete</Button>
                    </TableCell>
                  </TableRow>
                }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Drawer
          anchor="right"
          open={!!openDrawer}
        >
          {openDrawer === "add-form" && <Box component="form" onSubmit={addSubject} style={{ padding: "20px", paddingTop: "7rem" }}>
            <Box component={"h1"}> Add New Subject </Box>
            {/* <TextField fullWidth sx={{ mb: 3 }} inputProps={{ id: "id" }} label="Id"> </TextField> */}
            <TextField fullWidth sx={{ mb: 3 }} inputProps={{ id: "subject" }} label="Subject" error={Boolean(subError)} helperText={subError} > </TextField>
            <TextField fullWidth sx={{ mb: 3 }} inputProps={{ id: "level" }} label="Level"  error={Boolean(levelError)} helperText={levelError}> </TextField>
            <Box>
              <Button type="submit" variant="contained"> Add New Subject</Button>
            </Box>
          </Box>

          }
          {openDrawer === "edit-form" && <Box component="form" onSubmit={editSubjectEntry} style={{ padding: "20px", paddingTop: "7rem" }}>
            <Box component={"h1"}> Edit Subject  </Box>

            <TextField
              value={editSubject.subject}
              onChange={(e) => {
                setEditSubject(
                  (value) => {
                  return { ...value, subject: e.target.value }
                }
                )
              }}

              fullWidth sx={{ mb: 3 }} inputProps={{ id: "subject" }} label="Subject"> </TextField>
                <TextField
              value={editSubject.level}
              onChange={(e) => {
                setEditSubject((value) => {
                  return { ...value, level: e.target.value }
                })
              }}

              fullWidth sx={{ mb: 3 }} inputProps={{ id: "level" }} label="level"> </TextField>

         
            <Box>
              <Button type="submit" variant="contained"> Update Subject</Button>
            </Box>
          </Box>
          }
        </Drawer>
      </Paper>
    </>
  )
}
export default Subject;
