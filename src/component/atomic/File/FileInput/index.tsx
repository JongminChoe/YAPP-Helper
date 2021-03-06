import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setExcelValueRequset } from "../../../../store/action/desire";
import {
  setMailHeadImage,
  setMailSubImage,
  setMailHeadImageURL,
  setMailSubImageURL,
  setZipFile,
  toggleMailHeadImageEditMode,
  toggleMailSubImageEditMode,
} from "../../../../store/action/mail";
import SmallIconWrapper from "../../IconWrapper/Small";

import "./styles.scss";

type fileType = "image" | "xlsx" | "zip";

interface FileInputProps {
  fileTypes: Array<fileType>;
  targetImage: "head" | "sub";
}

const FileInput = ({ fileTypes, targetImage }: FileInputProps) => {
  const [isOver, setIsOver] = useState(false);
  const isError = useSelector<RootStore>((state) => state.desire.isError);
  const dispatch = useDispatch();

  function putDummyImage() {
    if (targetImage === "head") {
      dispatch(
        setMailHeadImageURL(
          "https://img.icons8.com/ios/50/000000/inspection.png"
        )
      );
      dispatch(toggleMailHeadImageEditMode());
    } else if (targetImage === "sub") {
      dispatch(
        setMailSubImageURL(
          "https://img.icons8.com/ios/50/000000/inspection.png"
        )
      );
      dispatch(toggleMailSubImageEditMode());
    }
  }

  const putFile = useCallback((file: File) => {
    if (file.type.match("^image/")) {
      if (targetImage === "head") {
        dispatch(setMailHeadImage(file));
        dispatch(toggleMailHeadImageEditMode());
      } else if (targetImage === "sub") {
        dispatch(setMailSubImage(file));
        dispatch(toggleMailSubImageEditMode());
      }
    } else if (file.type.match("application/x-zip-compressed")) {
      if (targetImage === "head") {
        alert("헤더에는 이미지만 넣을 수 있습니다!");
        return;
      }
      putDummyImage();
      // zip 파일을 넣는다
      dispatch(setZipFile(file));
    } else {
      alert("허용되지 않는 파일 형식입니다");
    }
  }, []);

  const dropHandler = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.items) {
      let file = event.dataTransfer.items[0].getAsFile();
      putFile(file);
      setIsOver(false);
    }
  };

  const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (isOver) return;
    setIsOver(true);
  };

  const dragLeaveHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!isOver) return;
    setIsOver(false);
  };

  const clickForFileCall = () => {
    const FileInputTag = document.createElement("input");
    const permittedFileTypes: string[] = [];
    FileInputTag.setAttribute("type", "file");

    // 이미지 허용
    if (fileTypes.includes("image")) {
      permittedFileTypes.push("image/*");
    }
    // zip 파일 허용
    if (fileTypes.includes("zip")) {
      permittedFileTypes.push(".zip");
    }

    FileInputTag.setAttribute("accept", permittedFileTypes.join(","));
    FileInputTag.addEventListener("change", () =>
      putFile(FileInputTag.files[0])
    );
    FileInputTag.click();
  };

  useEffect(() => {
    if (isError) {
      alert("이미지와 zip 파일만 업로드 할 수 있습니다.");
    }
  }, [isError]);
  return (
    <div
      onDrop={dropHandler}
      onDragOver={dragOverHandler}
      onDragLeave={dragLeaveHandler}
      className={isOver ? "file-drop-box isOver" : "file-drop-box"}
    >
      <div className="margin-bottom18px-wrapper">
        <SmallIconWrapper width={70} height={70} />
      </div>
      <p className="drop-box-guide-text">파일을 이곳에 끌어다 놓거나,</p>
      <p className="drop-box-file-button" onClick={clickForFileCall}>
        파일 불러오기
      </p>
    </div>
  );
};

export default FileInput;
