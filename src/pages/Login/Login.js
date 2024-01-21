import React, { useState } from "react";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginLogo from "../../assets/image/Login-MujiLogo.png";
import goSignUpIcon from "../../assets/icons/goSignUpIcon.svg";
import styles from "./Login.module.css";
import MemberLoginModal from "./Modal/SignUp";

function Login({ onClose }) {
  const [LoginId, setLoginId] = useState("");
  const [LoginPassword, setLoginPassword] = useState("");
  const [ismemberLoginOpen, setMemberLoginOpen] = useState(false);
  const navigate = useNavigate();

  const isEmailValid = /^(?=.*[a-z\d])[a-z\d]+@[a-z]+\.[a-z]+$/i.test(LoginId);
  const isPasswordValid = /^(?=.*[a-z])(?=.*\d).{8,20}$/.test(LoginPassword);

  const handleLoginIdChange = (event) => {
    setLoginId(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setLoginPassword(event.target.value);
  };

  const handleButton = async (event) => {
    if (isEmailValid && isPasswordValid) {
      try {
        const response = await fetch("여러분의_백엔드_로그인_엔드포인트", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: LoginId,
            password: LoginPassword,
          }),
        });

        if (response.ok) {
          // 로그인 성공, 필요한 경우 추가 작업 수행
          // 예를 들어 다른 페이지로 이동할 수 있습니다.
          // navigate('/main');
        } else {
          // 로그인 실패 처리, 사용자에게 오류 메시지를 표시할 수 있습니다.
          console.error("로그인 실패");
        }
      } catch (error) {
        console.error("로그인 중 오류 발생:", error);
      }
    }
  };

  const handleMemberButton = (event) => {
    setMemberLoginOpen(true);
  };

  return (
    <Container maxWidth="false" className={styles.loginContainer}>
      <Box sx={{ mt: 4, mb: 4 }} className={styles.loginBox}>
        <Box className={styles.loginHeader}>
          <Typography variant="h4" gutterBottom className={styles.formTitle}>
            로그인
          </Typography>
          <span>
            <img className={styles.loginLogo} src={LoginLogo} alt="로고"></img>
          </span>
        </Box>
        <Box className={styles.textContainer}>
          <TextField
            label="이메일"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={LoginId}
            onChange={handleLoginIdChange}
            placeholder="이메일 아이디를 입력하세요."
            className="form-input"
            error={!isEmailValid && LoginId.trim() !== ""}
            helperText={
              !isEmailValid &&
              LoginId.trim() !== "" &&
              "올바른 이메일 형식이 아닙니다."
            }
          />
          <TextField
            label="비밀번호"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={LoginPassword}
            onChange={handlePasswordChange}
            placeholder="비밀번호를 입력하세요."
            className="form-input"
            error={!isPasswordValid && LoginPassword.trim() !== ""}
            helperText={
              !isPasswordValid &&
              LoginPassword.trim() !== "" &&
              "비밀번호는 소문자와 숫자를 포함한 8~20자여야 합니다."
            }
          />
          <Box
            sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}
            className={styles.buttonBox}
          >
            <Button
              variant="contained"
              color="primary"
              className={styles.createButton}
              onClick={handleButton}
              disabled={!isEmailValid || !isPasswordValid}
            >
              로그인
            </Button>
          </Box>
          <div className={styles.goSignUp}>
            <span onClick={handleMemberButton}>회원가입 하러가기</span>
            <img className={styles.goSignUpArrowIcon} src={goSignUpIcon} />
          </div>
        </Box>
      </Box>
      {ismemberLoginOpen && (
        <MemberLoginModal onClose={() => setMemberLoginOpen(false)} />
      )}
    </Container>
  );
}

export default Login;
