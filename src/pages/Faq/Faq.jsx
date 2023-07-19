import React, { useEffect, useState } from "react";
import { Card, Button, TextField, Box, Accordion, AccordionSummary, AccordionDetails, Typography, Paper, Drawer, Dialog, styled, DialogContent, Divider, } from "@mui/material";
import { Close, Delete, Edit, Title } from "@mui/icons-material";



const Faq = () => {

  const [faq, setFaq] = useState([]);
  const [openModal, setOpenModal] = useState("");
  const [updateFaq, setUpdateFaq] = useState({});
  const [errorQue, setErrorQue] = useState("");
  const [errorAns , setErrorAns] = useState("");



  //open modal
  const handleEditClick = (faqObj) => {
    setUpdateFaq(faqObj)
    setOpenModal("edit-faq")
  }
  //edit faq
  const editedFaq = (e) => {
    e.preventDefault();
    const getNewFaq = faq.map((faqObj) => {
      if (faqObj.id === updateFaq.id) {
        return updateFaq;
      }
      else {
        return faqObj;
      }
    })
    setUpdateFaq(getNewFaq);
    console.log(getNewFaq);
    window.localStorage.setItem("faqData", JSON.stringify(getNewFaq));
    setOpenModal("")
  }

  //add new faq
  const addNewFaq = (e) => {

    e.preventDefault();
    const form = e.currentTarget;
    const date = new Date();
    const id = date.getTime();

    const faqData = {
      id: id,
      que: form.que.value,
      ans: form.ans.value,
    }
    //for validation
    const queValue = faqData.que;
    const ansValue = faqData.ans;

    if (queValue && ansValue) {
      setErrorQue("");
      setErrorAns("");
      const getNewFaq = [...faq, faqData];

      console.log(faq);
      setFaq(getNewFaq);
      window.localStorage.setItem("faqData", JSON.stringify(getNewFaq));

      setOpenModal("")
      console.log("modal close");
    }
    else {
      setErrorQue(!queValue ? "please insert your question" : "");
      setErrorAns(!ansValue ? "please insert your answer" : "" );
    }

  }

  //delete faq
  const deleteFaq = ((id) => {
    const filteredFaq = faq.filter((faqObj) => {
      if (faqObj.id !== id) {
        return true;
      }
      else {
        return false;
      }
    })
    setFaq(filteredFaq)
    window.localStorage.setItem("faqData", JSON.stringify(filteredFaq));
  })


  //to show data ,which was added
  useEffect(() => {
    const getFaqString = window.localStorage.getItem("faqData");
    if (getFaqString) {
      setFaq(JSON.parse(getFaqString));
    }
  }, []);


  return (
    <Paper sx={{ mt: 3, pb: 2 }}>
      <Box sx={{ textAlign: "right", margin: "10px 32px" }}>
        <Box sx={{ textAlign: "center", padding: "20px", }}>
          <Box component={`h1`}> FAQ'S </Box>
          <Typography> You can add faq's here ,delete faq's and update your last added. </Typography>
        </Box>
        <Button
          onClick={(e) => { setOpenModal("add-new") }} variant="contained"> Add New</Button>

      </Box>
      <Divider />
      <Box sx={{
        maxWidth: "70%",
        width: "100%",
        margin: "0 auto",
        padding: "1rem 2rem",
      }}>


        {faq.map((faqObj, i) => {
          return <Box className='accordian-wrapper' key={faqObj.id} sx={{ margin: "1.5rem 0.5rem" }}>
            <Accordion
              sx={{ margin: "15px 20px" }}
              className="accord-item">

              <AccordionSummary
                sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                className="accord-summary"
                aria-controls="panel1a-content"
                id="panel1a-header">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", flexWrap: "wrap" }}>
                  <div>
                    <Typography component={`h4`}>  {i + 1} {faqObj.que}</Typography>

                  </div>
                  <div>
                    <Box
                      onClick={(e) => {
                        e.stopPropagation();
                      }} >
                      <Button
                        onClick={() => { handleEditClick(faqObj) }}
                      >
                        <Edit />
                      </Button>

                      <Button
                        onClick={() => { deleteFaq(faqObj.id) }}
                      >
                        <Delete />
                      </Button>
                    </Box>
                  </div>
                </div>
              </AccordionSummary>

              <AccordionDetails >
                <Typography>
                  {faqObj.ans}
                </Typography>
              </AccordionDetails>

            </Accordion>
          </Box>
        })

        }
      </Box>

      <Paper>
        {openModal === "add-new" && <Dialog
          aria-labelledby="customized-dialog-title"
          open={!!openModal}
          onClose={() => { setOpenModal("") }}
          fullWidth={true}
          maxWidth={'md'}
        >

          <DialogContent>
            <Box component={`form`} onSubmit={addNewFaq}>
              <Box style={{ margin: "20px 0", textAlign: "center" }}>
                <Box id="customized-dialog-title" >

                  <Box component={`h1`}> Add New Faq's  </Box>
                </Box>
                <TextField
                  fullWidth
                  id="standard-basic"
                  label="Question"
                  variant="outlined"
                  error={Boolean(errorQue)}
                  helperText={errorQue}
                  inputProps={{ id: "que" }} />
              </Box>

              <Box style={{ margin: "20px 0", textAlign: "center" }}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  id="standard-basic"
                  label="Answer"
                  variant="outlined"
                  error={Boolean(errorAns)}
                  helperText={errorAns}
                  inputProps={{ id: "ans" }} />

              </Box>
              <Box style={{ margin: "20px 0", textAlign: "center" }}>
                <Button type="submit" style={{ padding: "15px ", fontSize: "20px", maxWidth: "300px" }} variant='contained' fullWidth>
                  Submit
                </Button>
              </Box>
            </Box>

          </DialogContent>


        </Dialog>
        }
        {openModal === "edit-faq" && <Dialog
          aria-labelledby="customized-dialog-title"
          open={!!openModal}
          onClose={() => { setOpenModal("") }}
          fullWidth={true}
          maxWidth={'md'}
        >
          <DialogContent>
            <Box component={`form`} onSubmit={editedFaq}>
              <Box style={{ margin: "20px 0", textAlign: "center" }}>
                <Box id="customized-dialog-title" >

                  <Box component={`h1`}> Edit Faq's  </Box>
                </Box>
                <TextField
                  fullWidth
                  label="Question"
                  variant="outlined"
                  inputProps={{ id: "que" }}
                  value={updateFaq.que}
                  onChange={(e) => {
                    setUpdateFaq((val) => {
                      return { ...val, que: e.target.value }
                    })
                  }} />
              </Box>

              <Box style={{ margin: "20px 0", textAlign: "center" }}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Answer"
                  variant="outlined"
                  value={updateFaq.ans}
                  onChange={(e) => {
                    setUpdateFaq((val) => {
                      return { ...val, ans: e.target.value }
                    })
                  }}
                  inputProps={{ id: "ans" }} />

              </Box>
              <Box style={{ margin: "20px 0", textAlign: "center" }}>
                <Button type="submit" style={{ padding: "15px ", fontSize: "20px", maxWidth: "300px" }} variant='contained' fullWidth>
                  Submit
                </Button>
              </Box>
            </Box>

          </DialogContent>


        </Dialog>}

      </Paper>

    </Paper>
  )
}
export default Faq;

