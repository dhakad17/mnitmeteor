import { makeStyles } from '@mui/styles';
export const LostFoundCardStyle = makeStyles({
    lfpaperStyle: {
        backgroundColor: "white",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        "@media (max-width: 600px)": {
            margin: "0rem",
        }
    },
    descriptionBox: {
        wordBreak: "break-all",
        maxHeight: "60px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: 3,
        WebkitBoxOrient: "vertical",
    }
});