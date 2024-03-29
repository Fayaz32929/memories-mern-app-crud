import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import useStyles from "./style";
import FileBase from "react-file-base64";
import { createPost, updatePost } from "../../actions/posts";
import { useDispatch, useSelector } from "react-redux";

export default function Form({ currentId, setCurrentId }) {
 const [postData, setPostData] = useState({ creater: "", title: "", message: "", tags: "", selectedFile: "" });
 const post = useSelector((state) => (currentId ? state.posts.find((p) => p._id === currentId) : null));

 const classes = useStyles();
 const dispatch = useDispatch();
 useEffect(() => {
  if (post) setPostData(post);
 }, [post]);
 const handleSubmit = (e) => {
  e.preventDefault();
  if (currentId) {
   dispatch(updatePost(currentId, postData));
  } else {
   dispatch(createPost(postData));
  }
  clear();
 };
 const clear = () => {
  setPostData({ creater: "", title: "", message: "", tags: "", selectedFile: "" });
 };
 return (
  <Paper className={classes.paper}>
   <form className={`${classes.root} ${classes.form}`} autoComplete="off" noValidate>
    <Typography variant="h6">{currentId ? "Editing" : "Creating"} a Memory</Typography>
    <TextField
     name="creator"
     variant="outlined"
     label="Creator"
     fullWidth
     value={postData.creater}
     onChange={(e) => setPostData({ ...postData, creater: e.target.value })}
    />
    <TextField
     name="title"
     variant="outlined"
     label="Title"
     fullWidth
     value={postData.title}
     onChange={(e) => setPostData({ ...postData, title: e.target.value })}
    />
    <TextField
     name="message"
     variant="outlined"
     label="Message"
     fullWidth
     value={postData.message}
     onChange={(e) => setPostData({ ...postData, message: e.target.value })}
    />
    <TextField
     name="tags"
     variant="outlined"
     label="Tags"
     fullWidth
     value={postData.tags}
     onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(",") })}
    />
    <div className={classes.fileInput}>
     <FileBase
      type="file"
      multiple={false}
      onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
     />
    </div>
    <Button
     onClick={handleSubmit}
     className={classes.buttonSubmit}
     color="primary"
     size="large"
     type="submit"
     fullWidth
     variant="contained"
    >
     Submit
    </Button>
    <Button color="secondary" size="small" onClick={clear} type="submit" fullWidth variant="contained">
     Clear
    </Button>
   </form>
  </Paper>
 );
}
