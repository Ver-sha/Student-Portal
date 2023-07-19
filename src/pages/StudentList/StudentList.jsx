import { AddRounded } from "@mui/icons-material";
import { Box, Button, Chip, Paper, TableCell, TableRow, TableBody, TableHead, Checkbox, Table, Divider, Autocomplete, TextField, Typography, Drawer } from "@mui/material";
import React, { useEffect, useState } from "react";


const defaultStudentValue = {
  id: 0,
  studentName: "",
  studentEmail: "",
  courseId: [],

}
const StudentList = () => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [studentData, setStudentData] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(''); // add | edit
  const [availableCourse, setAvailableCourse] = useState([]);
  const [formData, setFormdata] = useState(defaultStudentValue);
  const [courseError, setCourseError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (emailVal) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailVal);
  }


  const handleEditClick = (student) => {
    setOpenDrawer("edit");
    setFormdata(student);
  }

  const handleCloseForm = () => {
    setFormdata(defaultStudentValue)
    setOpenDrawer("");
  }

  //error validation
  const nameVal = formData.studentName;
  const emailVal = formData.studentEmail;
  const courseVal = formData.courseId;
  const isValidEmail = validateEmail(emailVal)

  const courseValLengt = courseVal.length

  const addStudent = (e) => {
    e.preventDefault();
    const date = new Date();
    const id = date.getTime();
    const newFormData = { ...formData, id: id };

    setFormdata(newFormData);

    if (nameVal && isValidEmail && courseValLengt) {
      setNameError("")
      setEmailError("")
      setCourseError("")

      const newStudentData = [...studentData, newFormData];
      setStudentData(newStudentData);
      console.log(setStudentData, "setstudentdata");
      window.localStorage.setItem("studentData", JSON.stringify(newStudentData));
      handleCloseForm()
    }
    else {
      setNameError(!nameVal ? "please insert your name" : "")
      setEmailError(!isValidEmail ? "please insert your email" : "")
      setCourseError(!courseValLengt ? "please select atleast 1 course" : "")
    }


  }

  const updateStudent = (e) => {
    debugger
    e.preventDefault();
    const updateStudentData = studentData.map((student) => {
      debugger
      if (student.id === formData.id) {
        debugger
        return formData;
      }
      else {
        debugger

        return student;
      }

    })
    setStudentData(updateStudentData);
    window.localStorage.setItem("studentData", JSON.stringify(updateStudentData))
    handleCloseForm()
  }
  const deleteStudent = (id) => {
    const deleteStudentData = studentData.filter((student) => student.id !== id
      // {
      //   if(student.id !== id){
      //     return true;
      //   }
      //   else{
      //     return false;
      //   }
      // }
    )
    window.localStorage.setItem("studentData", deleteStudentData)
    setStudentData(deleteStudentData)

  }

  useEffect(() => {
    const studentString = window.localStorage.getItem("studentData");
    const courseDataString = window.localStorage.getItem("courseData");

    if (studentString) {
      const getObj = JSON.parse(studentString);
      setStudentData(getObj);
      console.log(getObj);
    }

    console.log(studentString);

    if (courseDataString) {
      const getLocalData = JSON.parse(courseDataString);
      setAvailableCourse(getLocalData)
      console.log(getLocalData, "avilablecoursedata");
    }
  }, [])

  useEffect(() => {
    console.log("formdata", formData)
  }, [formData])
  return (
    <>
      <Paper>
        <Box sx={{ p: 1, textAlign: 'center' }}>
          <Box component={"h1"}>Student Table</Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ mt: 3, px: 2 }}>
            <TableCell padding="checkbox">
            </TableCell>
          </Box>
          <Box sx={{ mt: 3, px: 2 }}>
            <Button sx={{}} variant="contained" onClick={(e) => { setOpenDrawer('add') }}><AddRounded />Add New</Button>
          </Box>

        </Box>
        <Divider />

        <Box sx={{ p: 1 }}>
          <Table stickyHeader={true} >
            <TableHead>
              <TableRow>
                <TableCell variant="head">Select </TableCell>
                <TableCell variant="head">Sr No.</TableCell>
                <TableCell variant="head"> Name</TableCell>
                <TableCell variant="head">Email</TableCell>
                <TableCell variant="head">Course</TableCell>
                <TableCell variant="head">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentData.map((student, i) => {
                return <TableRow key={i} data-id={student.id}>
                  <TableCell><Checkbox {...label} /> </TableCell>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{student.studentName}</TableCell>
                  <TableCell>{student.studentEmail}</TableCell>
                  <TableCell>
                    {availableCourse.filter(courseItem => {
                      return student.courseId.includes(courseItem.id)
                    }
                    ).map(coItem => {
                      return <Chip key={coItem.id} label={coItem.courseName} variant="outlined" sx={{ mr: 1 }} />
                    })}
                  </TableCell>

                  <TableCell>
                    <Button sx={{ margin: "4px 5px" }} variant="contained" onClick={() => { handleEditClick(student) }}>edit</Button>
                    <Button sx={{ margin: "4px 5px" }} variant="contained" onClick={() => { deleteStudent(student.id) }}>delete</Button>
                  </TableCell>
                </TableRow>
              })}
            </TableBody>
          </Table>
        </Box>
      </Paper>

      <Drawer
        anchor={'right'}
        open={!!openDrawer}
        onClose={() => { setOpenDrawer('') }}
      >
        {openDrawer === 'add' && <Box component={`form`} onSubmit={addStudent} sx={{ p: 2, pt: 10 }}>
          <Typography component={`h4`} variant="h4" mb={4} sx={{ textAlign: 'center' }}>Add New Student</Typography>
          <TextField error={Boolean(nameError)} helperText={nameError} fullWidth sx={{ mb: 3 }} value={formData.studentName} label="Student Name" onChange={(e) => { setFormdata({ ...formData, studentName: e.target.value }) }} />
          <TextField error={Boolean(emailError)} helperText={emailError} value={formData.studentEmail} type="email" fullWidth sx={{ mb: 3 }} label="Email" onChange={(e) => { setFormdata({ ...formData, studentEmail: e.target.value }) }} />

          <Autocomplete
            sx={{ mb: 3 }}
            disablePortal
            multiple
            id="tags-outlined"
            options={availableCourse}
            getOptionLabel={(course) => course.courseName}
            renderInput={(params) => (
              <TextField {...params} label="Course Options"
                error={Boolean(courseError)}
                helperText={courseError}
              />)}
            onChange={((e, values) => {
              const arrId = values.map((value) => value.id)
              let updatedForm = { ...formData, courseId: arrId }
              setFormdata(updatedForm)
              console.log(updatedForm);
            })}
          />

          <Box sx={{ textAlign: 'center' }}>
            <Button type="submit" variant="contained" size="large">Add Student</Button>
          </Box>
        </Box>}

        {openDrawer === 'edit' && <Box component={`form`} onSubmit={updateStudent} sx={{ p: 2, pt: 10 }}>
          <Typography component={`h4`} variant="h4" mb={4} sx={{ textAlign: 'center' }}>Edit Student</Typography>

          <TextField fullWidth sx={{ mb: 3 }} label="Student Name" value={formData.studentName}
            onChange={(e) => { setFormdata({ ...formData, studentName: e.target.value }) }} />

          <TextField fullWidth sx={{ mb: 3 }} label="Email" value={formData.studentEmail}
            onChange={(e) => { setFormdata({ ...formData, studentEmail: e.target.value }) }} />

          <Autocomplete
            sx={{ mb: 3 }}
            disablePortal
            multiple
            id="tags-outlined"
            options={availableCourse}
            getOptionLabel={(item) => item.courseName}
            renderInput={(params) => (
              <TextField {...params} label="Course Options" />)}
            defaultValue={availableCourse.filter((course) => formData.courseId.includes(course.id))}
            onChange={(e, values) => {
              const arrId = values.map((value) => value.id)
              setFormdata({ ...formData, courseId: arrId })
            }} />

          <Box sx={{ textAlign: 'center' }}>
            <Button type="submit" variant="contained" size="large">Update student</Button>
          </Box>
        </Box>}

      </Drawer>
    </>
  )
}
export default StudentList;

