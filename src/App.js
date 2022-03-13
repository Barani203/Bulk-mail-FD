import "./App.css";
import EmailIcon from "@material-ui/icons/Email";
import BusinessIcon from "@material-ui/icons/Business";
import SubjectIcon from "@material-ui/icons/Subject";
import ReactQuill from "react-quill";
//ES6
import "react-quill/dist/quill.snow.css";
import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import Alert from "@mui/material/Alert";

function App() {
  const Form = () => {
    // input function
    const [tags, setTags] = useState([]);
    const addTag = (e) => {
      if (e.key === " ") {
        if (e.target.value.length > 0) {
          setTags([...tags, e.target.value]);
          e.target.value = "";
        }
      }
    };
    const removeTag = (removedTag) => {
      const newTags = tags.filter((tag) => tag !== removedTag);
      setTags(newTags);
    };
    // form function
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [subject, setSubject] = useState("");
    const [company, setCompany] = useState("");
    const [loading, setLoading] = useState(false);

    const handleQuillChange = (value) => {
      setMessage(value);
    };

    const handleRequest = async (e) => {
      if (email && company && subject !== "") {
        if (message !== "") {
          e.preventDefault();
          setLoading(true);
          console.log({ email, message, subject, company });

          let payload = {
            email: tags,
            subject: subject,
            message: message,
            company: company,
          };

          axios({
            url: "https://bulkmailtool2.herokuapp.com/",
            method: "post",
            data: payload,
          })
            .then((res) => {
              alert("Email Sent Successfully");
              setLoading(false);
              console.log(res);
              window.location.reload();
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            });
        } else {
          alert("Compose Email");
        }
      } else {
        alert("Please fill all required filled");
      }
    };
    return (
      <>
        {/* tag input */}
        <div className="container">
          <div className="row">
            <div className="col-sm-12 mr-5 ">
              {/* form field */}
              <form onSubmit={handleRequest} method="post">
                <div className="form">
                  <div className="form__wrapper">
                    <div className="form__title">
                      <h4>{loading ? "Sending..." : "Bulk Email"}</h4>
                      {loading && (
                        <Alert variant="filled" severity="success">
                          Email Sent Successfully check it out!
                        </Alert>
                      )}
                    </div>
                    <div className="form__container">
                      <div className="form__containerItems">
                        <div className="form__containerItem"></div>
                        <div className="form__containerItem">
                          <div className="form__containerItemName">
                            <label>Email</label>

                            <EmailIcon />
                          </div>
                          <div className="form__containerItemField">
                            <div className="tag-input">
                              <ul className="tags">
                                {tags.map((tag, index) => {
                                  return (
                                    <li key={index} className="tag">
                                      <span className="tag-title">{tag}</span>
                                      <span
                                        className="tag-close-icon"
                                        onClick={() => removeTag(tag)}
                                      >
                                        x
                                      </span>
                                    </li>
                                  );
                                })}
                              </ul>
                              <input
                                id="email"
                                value={email}
                                type="email"
                                onKeyDown={addTag}
                                onChange={(e) => setEmail(e.target.value)}
                                required={true}
                                placeholder="Press space to add a Email"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form__containerItem">
                          <div className="form__containerItemName">
                            <label>Company</label>
                            <BusinessIcon />
                          </div>
                          <div className="form__containerItemField">
                            <input
                              id="company"
                              value={company}
                              onChange={(e) => setCompany(e.target.value)}
                              type="text"
                              placeholder="Enter Your Company Name"
                            />
                          </div>
                        </div>
                        <div className="form__containerItem">
                          <div className="form__containerItemName">
                            <label>Subject</label>
                            <SubjectIcon />
                          </div>
                          <div className="form__containerItemField">
                            <input
                              id="subject"
                              value={subject}
                              onChange={(e) => setSubject(e.target.value)}
                              required
                              type="text"
                              placeholder="Add Subject"
                            />
                          </div>
                        </div>
                        <div className="form__containerItem">
                          <div className="form__containerItemName">
                            <label>Compose Mail</label>
                          </div>
                        </div>
                        <div className="container__composeMail">
                          <ReactQuill
                            id="message"
                            value={message}
                            onChange={handleQuillChange}
                            className="quill"
                            placeholder="Enter Content from here..."
                          />
                        </div>
                        <div className="send">
                          <button
                            disabled={loading}
                            onClick={handleRequest}
                            type="submit"
                            className="btn btn-success"
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="container-fluid">
      <>
        <Form />
      </>
    </div>
  );
}

export default App;
