import { useEffect, useState } from "react";
import { Autocomplete, Box, Button, Checkbox, Chip, Divider, Drawer, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography, } from "@mui/material";
import { AddRounded } from "@mui/icons-material";


const defaultFormValue = {
  id: 0,
  courseName: "",
  subjectId: [],
  price: 0,
}

const Courses = () => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [courseData, setCourseData] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(''); // add | edit
  const [availableSubject, setAvailableSubjects] = useState([]);
  const [formData, setFormdata] = useState(defaultFormValue);
  const [courseError , setCourseError ] = useState("");
  const [priceError , setPriceError ] = useState("");
  const [subError , setSubError ] = useState("");
  
  const addCourse = (e) => {
    e.preventDefault();
    const date = new Date();
    const id = date.getTime();
    const newformData = {...formData, id: id };
    //for validation purpose
    const courseVal = formData.courseName;
    const subVal = formData.subjectId;
    const priceVal = formData.price;
    const subValLength = subVal.length;

    if(courseVal && subValLength && priceVal){
      setCourseError("")
      setSubError("")
      setPriceError("")
      setFormdata(newformData);
    const newCourseData = [...courseData, newformData]
    setCourseData(newCourseData);
    window.localStorage.setItem('courseData', JSON.stringify(newCourseData));
    handleCloseForm()
    }
    else{
      setCourseError( !courseVal ? "please fill course name" : "")
      setSubError(!subValLength? "please select atleast 1 subject" : "")
      setPriceError(!priceVal ? "please insert price" : "")
    }
    
  }

  const handleEditClick = (course) => {
    setFormdata(course)
    setOpenDrawer('edit');
  }
  const handleCloseForm = () => {
    setFormdata(defaultFormValue)
    setOpenDrawer("")
  }

  const updateCourse = (e) => {
    e.preventDefault();
    const updatedCourse = courseData.map((course) =>{
      if (course.id === formData.id) {
        return formData;
      }
      else {
        return course;
      }
    }
    //  course.id === formData.id ? formData : course
     
    );

    setCourseData(updatedCourse);
    window.localStorage.setItem('courseData', JSON.stringify(updatedCourse));
    handleCloseForm()

  }

  const deleteCourse = (id) => {
     const deletedData = courseData.filter((course) => course.id !== id);
    
    window.localStorage.setItem('courseData', JSON.stringify(deletedData));
    setCourseData(deletedData);
  }

  useEffect(() => {
    const dataString = window.localStorage.getItem('courseData');
    const subjectsData = window.localStorage.getItem("SubjectData");

    if (dataString) {
      setCourseData(JSON.parse(dataString));
    }

    if (subjectsData) {
      const getLocalData = JSON.parse(subjectsData)
      setAvailableSubjects(getLocalData)
    }
  }, []);

  useEffect(() => {
    console.log("formData", formData);
  }, [formData])

  function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  }

  return (
    <>
      <Paper sx={{ mt: 3, pb: 2 }}>
        <Box sx={{ p: 1, textAlign: 'center' }}>
          <Box component={"h1"}>Course Table</Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ mt: 3, px: 2 }}>
            {/* <TableCell padding="checkbox">
               <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          /> 
            </TableCell> */}


            {/* <Button variant="contained"> Select All  </Button> */}

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
                <TableCell variant="head">Course Name</TableCell>
                <TableCell variant="head"> Subjects</TableCell>
                <TableCell variant="head">Price</TableCell>
                <TableCell variant="head">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courseData.map((course, i) => {
                return <TableRow key={i} >
                  <TableCell> <Checkbox {...label} /> </TableCell>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{course.courseName}</TableCell>
                  <TableCell>
                     {availableSubject.filter((subItem)=>{
                      
                      return course.subjectId.includes(subItem.id)
                      
                     }).map((subItem)=>{
                      // debugger
                      return <Chip key={subItem.id} label={`${subItem.subject} : ${subItem.level}`}> </Chip>
                     })}
                  </TableCell>
                  <TableCell>{course.price}</TableCell>
                  <TableCell>
                    <Button sx={{ margin: "4px 5px" }} variant="contained" onClick={() => { handleEditClick(course) }}>edit</Button>
                    <Button sx={{ margin: "4px 5px" }} variant="contained" onClick={() => { deleteCourse(course.id) }}>delete</Button>
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
        {openDrawer === 'add' && <Box component={`form`} onSubmit={addCourse} sx={{ p: 2, pt: 10 }}>
          <Typography component={`h4`} variant="h4" mb={4} sx={{ textAlign: 'center' }}>Add New Course</Typography>
          <TextField error={Boolean(courseError)} helperText={courseError} fullWidth sx={{ mb: 3 }} value={formData.courseName} label="Course Name" onChange={(e) => { setFormdata({ ...formData, courseName: e.target.value }) }} />

          <Autocomplete
            sx={{ mb: 3 }}
            disablePortal
            multiple
            id="tags-outlined"
            options={availableSubject}
            getOptionLabel={(subjects) => `${subjects.subject} : ${subjects.level}`}
            renderInput={(params) => (
              <TextField {...params} label="Subject Options" 
              error={Boolean(subError)} 
              helperText={subError}
               />)}
            onChange={((e, values) => {
              const arrId = values.map((value) => value.id)
              let updatedForm = { ...formData, subjectId: arrId }
              setFormdata(updatedForm)
              console.log(updatedForm);
            })}
          />

          <TextField error={Boolean(priceError)} helperText={priceError}  value={formData.price} type="number" fullWidth sx={{ mb: 3 }} inputProps={{ id: "price" }} label="Price" onChange={(e) => { setFormdata({ ...formData, price: e.target.value }) }} />
          <Box sx={{ textAlign: 'center' }}>
            <Button type="submit" variant="contained" size="large">Add Course</Button>
          </Box>
        </Box>}

        {openDrawer === 'edit' && <Box component={`form`} onSubmit={updateCourse} sx={{ p: 2, pt: 10 }}>
          <Typography component={`h4`} variant="h4" mb={4} sx={{ textAlign: 'center' }}>Edit Course</Typography>

          <TextField fullWidth sx={{ mb: 3 }} label="Course Name" value={formData.courseName}
            onChange={(e) => { setFormdata({ ...formData, courseName: e.target.value }) }} />

          <Autocomplete
            sx={{ mb: 3 }}
            disablePortal
            multiple
            id="tags-outlined"
            options={availableSubject}
            getOptionLabel={(item) => `${item.subject} : ${item.level} `}
            renderInput={(params) => (
              <TextField {...params} label="Subject Options" />)}
            defaultValue={availableSubject.filter((subject) => formData.subjectId.includes(subject.id))}
            onChange={(e, values) => {
              const arrId = values.map((value) => value.id)
              setFormdata({ ...formData, subjectId: arrId })
            }} />

          <TextField fullWidth sx={{ mb: 3 }} label="Price" value={formData.price}
            onChange={(e) => { setFormdata({ ...formData, price: e.target.value }) }} />

          <Box sx={{ textAlign: 'center' }}>
            <Button type="submit" variant="contained" size="large">Update Course</Button>
          </Box>
        </Box>}
      </Drawer>


    </>
  );

}
export default Courses;
