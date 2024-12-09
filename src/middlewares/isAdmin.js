// import jwt from "jsonwebtoken";

// export const isAdmin = (req, res, next) => {
//     try {
//         const token = req.headers.authorization?.split(" ")[1];
//         if (!token) return res.status(403).json({ message: "Không có token" });

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         if (decoded.role !== "admin") {
//             return res.status(403).json({ message: "Không có quyền truy cập" });
//         }

//         next();
//     } catch (err) {
//         res.status(401).json({ message: "Xác thực thất bại" });
//     }
// };
