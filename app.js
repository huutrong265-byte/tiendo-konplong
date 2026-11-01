/**
 * ==============================================================================
 * HỆ THỐNG QUẢN LÝ & THEO DÕI TIẾN ĐỘ ĐO ĐẠC ĐỊA CHÍNH (CADA-TRACK ENGINE)
 * Thiết kế chuyên sâu cho Tổ/Đội Đo đạc - Bản đồ Địa chính Việt Nam
 * ==============================================================================
 */

// Định nghĩa 6 giai đoạn chuẩn ngành địa chính
const STAGES = [
    { id: 0, name: "Chưa triển khai", color: "#94a3b8", shortName: "Chưa đo" },
    { id: 1, name: "Lưới khống chế", color: "#0284c7", shortName: "Lưới KC" },
    { id: 2, name: "Đo ngoại nghiệp", color: "#2563eb", shortName: "Ngoại nghiệp" },
    { id: 3, name: "Biên tập nội nghiệp", color: "#7c3aed", shortName: "Nội nghiệp" },
    { id: 4, name: "Lập HS & Kê khai", color: "#d97706", shortName: "Hồ sơ" },
    { id: 5, name: "Kiểm tra KCS", color: "#0891b2", shortName: "KCS" },
    { id: 6, name: "Đã nghiệm thu", color: "#059669", shortName: "Nghiệm thu" }
];

// Danh sách 25 thôn chính thức của Xã Kon Plông kèm danh bạ Bí thư & Trưởng thôn
const KONPLONG_VILLAGES = [
    { stt: 1, name: "Thôn Kon Plông", secName: "Y On", secPhone: "0867185034", leaderName: "Y Gam", leaderPhone: "0985021374", note: "" },
    { stt: 2, name: "Thôn Vi Glơng", secName: "Y Xâm", secPhone: "0971497734", leaderName: "A Nỉ", leaderPhone: "0375760616", note: "" },
    { stt: 3, name: "Thôn Đắk Lom", secName: "A Hiệp", secPhone: "0969452629", leaderName: "A Hiệp", leaderPhone: "0969452629", note: "Kiêm Trưởng thôn" },
    { stt: 4, name: "Thôn Vi Chring", secName: "A Da", secPhone: "0866499206", leaderName: "A Da", leaderPhone: "0348424300", note: "Kiêm Trưởng thôn" },
    { stt: 5, name: "Thôn Đắk Xô", secName: "Vi Đình Huấn", secPhone: "0334743095", leaderName: "Vi Đình Huấn", leaderPhone: "0334743095", note: "Kiêm Trưởng thôn" },
    { stt: 6, name: "Thôn Kon Plinh", secName: "A Hí", secPhone: "0368880432", leaderName: "A Hí", leaderPhone: "0368880432", note: "Kiêm Trưởng thôn" },
    { stt: 7, name: "Thôn Tu Cần", secName: "A Khàn", secPhone: "0978703349", leaderName: "A Khàn", leaderPhone: "0978703349", note: "Kiêm Trưởng thôn" },
    { stt: 8, name: "Thôn Vi Choong", secName: "A Vững", secPhone: "0988797368", leaderName: "A Vững", leaderPhone: "0399007626", note: "Kiêm Trưởng thôn" },
    { stt: 9, name: "Thôn Kon Klùng", secName: "A Buôn", secPhone: "0327459540", leaderName: "A Buôn", leaderPhone: "0327459540", note: "Kiêm Trưởng thôn" },
    { stt: 10, name: "Thôn Vi K Lâng 1", secName: "A Bền", secPhone: "0362827041", leaderName: "A Bền", leaderPhone: "0898352634", note: "Kiêm Trưởng thôn" },
    { stt: 11, name: "Thôn Vi K Lâng 2", secName: "A Kỳ", secPhone: "0372362382", leaderName: "A Chờn", leaderPhone: "0357892438", note: "" },
    { stt: 12, name: "Thôn Vi Pờ Ê", secName: "A Khoan", secPhone: "0392422632", leaderName: "Đinh Hồng Thảo", leaderPhone: "0911693034", note: "" },
    { stt: 13, name: "Thôn Vi K Tàu", secName: "A Nhật", secPhone: "0985779028", leaderName: "A Nhật", leaderPhone: "0905201545", note: "Kiêm Trưởng thôn" },
    { stt: 14, name: "Thôn Vi K Oa", secName: "A Theo", secPhone: "0961293861", leaderName: "A Trức", leaderPhone: "0328970890", note: "" },
    { stt: 15, name: "Thôn Vi Ô Lắk", secName: "A Khan", secPhone: "0979745834", leaderName: "Đinh Văn Sứt (PBT)", leaderPhone: "0345066780", note: "Kiêm Trưởng thôn" },
    { stt: 16, name: "Thôn Măng Krí", secName: "Đinh Xuân Quỳnh", secPhone: "0355246484", leaderName: "Đinh Xuân Quỳnh", leaderPhone: "0355246484", note: "Kiêm Trưởng thôn" },
    { stt: 17, name: "Thôn Điek Chè", secName: "A Anh", secPhone: "0398267032", leaderName: "Lê Trân", leaderPhone: "0981726685", note: "" },
    { stt: 18, name: "Thôn Điek Lò", secName: "Đinh Văn Xanh", secPhone: "0359189728", leaderName: "A KĐép", leaderPhone: "0394661104", note: "" },
    { stt: 19, name: "Thôn Điek Tem", secName: "Đinh Văn Ba", secPhone: "0986533709", leaderName: "Đinh Thị Sương", leaderPhone: "0356098701", note: "" },
    { stt: 20, name: "Thôn Điek Nót A", secName: "Y Liêm", secPhone: "0373908143", leaderName: "A Niềng", leaderPhone: "0352093681", note: "" },
    { stt: 21, name: "Thôn Điek Kua", secName: "Đinh Văn Đin", secPhone: "0327272459", leaderName: "Đinh Hồng Dớc", leaderPhone: "0327618460", note: "" },
    { stt: 22, name: "Thôn Kíp Plinh", secName: "A Sáu", secPhone: "0345310468", leaderName: "A Sáu", leaderPhone: "0345310468", note: "Kiêm Trưởng thôn" },
    { stt: 23, name: "Thôn Điek Tà Âu", secName: "A Láo", secPhone: "0866065817", leaderName: "A Láo", leaderPhone: "0927185804", note: "Kiêm Trưởng thôn" },
    { stt: 24, name: "Thôn Điek Pét", secName: "A Xiết", secPhone: "0961117566", leaderName: "A Tốc", leaderPhone: "0399770081", note: "" },
    { stt: 25, name: "Thôn Măng Nách", secName: "A Đành", secPhone: "0396523130", leaderName: "A Đành", leaderPhone: "0862278425", note: "Kiêm Trưởng thôn" }
];

// Dữ liệu mẫu khởi tạo ban đầu (Dự án thực tế tại Kon Plông)
const DEFAULT_PROJECT_DATA = {
    project: {
        id: "proj-001",
        name: "Đo đạc chỉnh lý bản đồ địa chính & Lập HS địa chính xã Kon Plông",
        province: "Quảng Ngãi",
        district: "Huyện Kon Plông",
        ward: "Xã Kon Plông",
        crs: "VN-2000 KT 107°30' múi 3°",
        startDate: "2026-10-01",
        deadline: "2026-12-31",
        teamName: "CTY Môi Trường Phước Thịnh - Chi nhánh Kon Plông",
        password: "DoiLandTeam",
        staffPassword: "123456"
    },
    villages: KONPLONG_VILLAGES,
    members: [
        { id: "mem-1", name: "Nguyễn Trọng Đợi", role: "Giám Đốc (Chỉ đạo chung & KCS)", phone: "0979103937", device: "Chỉ đạo điều hành / KCS phê duyệt sản phẩm" },
        { id: "mem-2", name: "Nguyễn Xuân Huy", role: "Nhân viên kỹ thuật (Tổ trưởng ngoại nghiệp)", phone: "0982629774", device: "Máy GNSS RTK Foif / Trắc địa hiện trường" },
        { id: "mem-3", name: "Lê Hồng Phi", role: "Nhân viên kỹ thuật (Đo đạc ngoại nghiệp)", phone: "0336092353", device: "Máy toàn đạc điện tử Leica TS06 Plus" },
        { id: "mem-4", name: "Nguyễn Hải Yến", role: "Nhân viên kỹ thuật (Nội nghiệp & Hồ sơ)", phone: "0777081137", device: "PC Trạm - MicroStation V8i & Lập HS địa chính" },
        { id: "mem-5", name: "Liêu Văn Khoa", role: "Nhân viên kỹ thuật (Đo đạc & Lập lưới)", phone: "0375084112", device: "Máy RTK / Lập lưới khống chế tọa độ" },
        { id: "mem-6", name: "Phan Trần Kiến Dương", role: "Nhân viên kỹ thuật (Biên tập bản đồ CAD)", phone: "0935769584", device: "PC Trạm - AutoCAD Map / Chuẩn hóa tiếp biên" },
        { id: "mem-7", name: "Hồ Nguyễn Hữu Trọng", role: "Sinh viên năm 4 (Thực tập sinh kỹ thuật)", phone: "0335301816", device: "Phụ máy đo RTK, Ghi sổ mốc & Khảo sát ranh" }
    ],
    sheets: [
        { id: "sh-01", code: "Tờ 01", village: "Thôn Kon Plông", parcels: 145, area: 18.2, stage: 6, progress: 100, surveyor: "Nguyễn Xuân Huy", cadEditor: "Nguyễn Hải Yến", notes: "Khu vực trung tâm xã Kon Plông, đã nghiệm thu cấp xã và nộp thẩm định." },
        { id: "sh-02", code: "Tờ 02", village: "Thôn Vi Glơng", parcels: 160, area: 22.5, stage: 5, progress: 90, surveyor: "Lê Hồng Phi", cadEditor: "Phan Trần Kiến Dương", notes: "Đang nộp KCS Giám đốc Đợi đối soát sai số tiếp biên với Tờ 01." },
        { id: "sh-03", code: "Tờ 03", village: "Thôn Đắk Lom", parcels: 135, area: 19.8, stage: 5, progress: 85, surveyor: "Liêu Văn Khoa", cadEditor: "Nguyễn Hải Yến", notes: "KCS đã kiểm tra sai số khép góc đường chuyền, chuẩn bị nộp hồ sơ." },
        { id: "sh-04", code: "Tờ 04", village: "Thôn Vi Chring", parcels: 190, area: 31.0, stage: 4, progress: 75, surveyor: "Nguyễn Xuân Huy", cadEditor: "Phan Trần Kiến Dương", notes: "Đang phát phiếu xác nhận kết quả đo đạc và ký giáp ranh tại nhà rông thôn." },
        { id: "sh-05", code: "Tờ 05", village: "Thôn Đắk Xô", parcels: 120, area: 16.5, stage: 4, progress: 70, surveyor: "Lê Hồng Phi", cadEditor: "Nguyễn Hải Yến", notes: "Đã vẽ xong CAD, đang in trích lục để các hộ ký biên bản." },
        { id: "sh-06", code: "Tờ 06", village: "Thôn Kon Plinh", parcels: 175, area: 28.4, stage: 3, progress: 55, surveyor: "Liêu Văn Khoa", cadEditor: "Phan Trần Kiến Dương", notes: "Ngoại nghiệp đã bàn giao số liệu thô ngày 28/10, đang biên tập MicroStation." },
        { id: "sh-07", code: "Tờ 07", village: "Thôn Tu Cần", parcels: 140, area: 21.0, stage: 3, progress: 50, surveyor: "Nguyễn Xuân Huy", cadEditor: "Nguyễn Hải Yến", notes: "Đang chuẩn hóa tiếp biên và gán nhãn số thửa theo quy chuẩn." },
        { id: "sh-08", code: "Tờ 08", village: "Thôn Vi Choong", parcels: 210, area: 42.0, stage: 3, progress: 45, surveyor: "Hồ Nguyễn Hữu Trọng", cadEditor: "Phan Trần Kiến Dương", notes: "Đang gộp file tọa độ trạm RTK, phân lớp địa chính trong MicroStation." },
        { id: "sh-09", code: "Tờ 09", village: "Thôn Kon Klùng", parcels: 155, area: 24.3, stage: 2, progress: 35, surveyor: "Lê Hồng Phi", cadEditor: "Nguyễn Hải Yến", notes: "Đang dẫn mốc và đo ranh đất nông nghiệp ven đồi." },
        { id: "sh-10", code: "Tờ 10", village: "Thôn Vi K Lâng 1", parcels: 180, area: 32.6, stage: 2, progress: 30, surveyor: "Nguyễn Xuân Huy", cadEditor: "Phan Trần Kiến Dương", notes: "Địa hình vườn đồi cây cối rậm, đang dùng toàn đạc phối hợp RTK." },
        { id: "sh-11", code: "Tờ 11", village: "Thôn Vi K Lâng 2", parcels: 165, area: 29.1, stage: 2, progress: 25, surveyor: "Liêu Văn Khoa", cadEditor: "Nguyễn Hải Yến", notes: "Đang cùng Trưởng thôn A Chờn dẫn ranh các thửa đất ở và nương rẫy." },
        { id: "sh-12", code: "Tờ 12", village: "Thôn Vi Pờ Ê", parcels: 220, area: 45.0, stage: 2, progress: 20, surveyor: "Lê Hồng Phi", cadEditor: "Phan Trần Kiến Dương", notes: "Triển khai đo đạc ngoại nghiệp khu vực ngã ba đường lớn." },
        { id: "sh-13", code: "Tờ 13", village: "Thôn Vi K Tàu", parcels: 130, area: 18.9, stage: 1, progress: 15, surveyor: "Hồ Nguyễn Hữu Trọng", cadEditor: "Nguyễn Hải Yến", notes: "Đã chôn mốc khống chế địa chính cấp 2, đang đo tọa độ tĩnh." },
        { id: "sh-14", code: "Tờ 14", village: "Thôn Vi K Oa", parcels: 145, area: 22.4, stage: 1, progress: 10, surveyor: "Nguyễn Xuân Huy", cadEditor: "Phan Trần Kiến Dương", notes: "Đang khảo sát chọn điểm lập đường chuyền toàn đạc." },
        { id: "sh-15", code: "Tờ 15", village: "Thôn Vi Ô Lắk", parcels: 195, area: 36.8, stage: 1, progress: 10, surveyor: "Liêu Văn Khoa", cadEditor: "Nguyễn Hải Yến", notes: "Khảo sát thực địa cùng PBT Đinh Văn Sứt." },
        { id: "sh-16", code: "Tờ 16", village: "Thôn Măng Krí", parcels: 110, area: 15.2, stage: 1, progress: 5, surveyor: "Lê Hồng Phi", cadEditor: "Chưa phân công", notes: "Đã liên hệ Bí thư Đinh Xuân Quỳnh để chuẩn bị cắm mốc." },
        { id: "sh-17", code: "Tờ 17", village: "Thôn Điek Chè", parcels: 160, area: 27.5, stage: 1, progress: 5, surveyor: "Hồ Nguyễn Hữu Trọng", cadEditor: "Chưa phân công", notes: "Khảo sát mạng lưới đường chuyền." },
        { id: "sh-18", code: "Tờ 18", village: "Thôn Điek Lò", parcels: 175, area: 30.0, stage: 0, progress: 0, surveyor: "Chưa phân công", cadEditor: "Chưa phân công", notes: "Kế hoạch đo đạc tuần sau." },
        { id: "sh-19", code: "Tờ 19", village: "Thôn Điek Tem", parcels: 140, area: 23.5, stage: 0, progress: 0, surveyor: "Chưa phân công", cadEditor: "Chưa phân công", notes: "Chưa triển khai." },
        { id: "sh-20", code: "Tờ 20", village: "Thôn Điek Nót A", parcels: 150, area: 25.8, stage: 0, progress: 0, surveyor: "Chưa phân công", cadEditor: "Chưa phân công", notes: "Chưa triển khai." },
        { id: "sh-21", code: "Tờ 21", village: "Thôn Điek Kua", parcels: 185, area: 34.0, stage: 0, progress: 0, surveyor: "Chưa phân công", cadEditor: "Chưa phân công", notes: "Chưa triển khai." },
        { id: "sh-22", code: "Tờ 22", village: "Thôn Kíp Plinh", parcels: 125, area: 19.0, stage: 0, progress: 0, surveyor: "Chưa phân công", cadEditor: "Chưa phân công", notes: "Chưa triển khai." },
        { id: "sh-23", code: "Tờ 23", village: "Thôn Điek Tà Âu", parcels: 170, area: 28.2, stage: 0, progress: 0, surveyor: "Chưa phân công", cadEditor: "Chưa phân công", notes: "Chưa triển khai." },
        { id: "sh-24", code: "Tờ 24", village: "Thôn Điek Pét", parcels: 135, area: 20.5, stage: 0, progress: 0, surveyor: "Chưa phân công", cadEditor: "Chưa phân công", notes: "Chưa triển khai." },
        { id: "sh-25", code: "Tờ 25", village: "Thôn Măng Nách", parcels: 190, area: 35.0, stage: 0, progress: 0, surveyor: "Chưa phân công", cadEditor: "Chưa phân công", notes: "Chưa triển khai." }
    ],
    issues: [
        {
            id: "iss-1",
            sheetId: "sh-03",
            parcel: "Thửa 42, 43",
            owner: "Hộ A Blong và Hộ Y Hằng",
            type: "Tranh chấp ranh giới",
            desc: "Hai bên gia đình chưa thống nhất được ranh giới bờ rào phía sau nhà (lệch khoảng 0.4m dài 15m), chưa ký biên bản giáp ranh.",
            solution: "KTV Nguyễn Xuân Huy đã lập biên bản hiện trạng; đề nghị cán bộ địa chính xã Kon Plông và Già làng/Trưởng thôn chủ trì hòa giải.",
            status: "processing",
            date: "2026-10-25"
        },
        {
            id: "iss-2",
            sheetId: "sh-04",
            parcel: "Thửa 89",
            owner: "Ông Hoàng Văn Định",
            type: "Chủ đất vắng mặt",
            desc: "Chủ nhà đang sinh sống tại TP.HCM, nhà khóa cửa, người nhà ở quê chưa có giấy ủy quyền hợp lệ.",
            solution: "KTV Lê Hồng Phi đã liên hệ qua điện thoại, gửi hình ảnh trích đo qua Zalo để chủ đất kiểm tra và gửi giấy ủy quyền công chứng về.",
            status: "processing",
            date: "2026-10-27"
        },
        {
            id: "iss-3",
            sheetId: "sh-02",
            parcel: "Thửa 12B",
            owner: "Bà Trần Thị Liễu",
            type: "Sai lệch sổ cũ",
            desc: "Diện tích đo thực tế 480m2, tăng 65m2 so với GCN cũ cấp năm 2002 do có phần đất bờ đồi khai hoang thêm.",
            solution: "KTV Liêu Văn Khoa đã đo chi tiết hiện trạng, hướng dẫn chủ sử dụng kê khai nguồn gốc đất theo mẫu 04a/ĐK.",
            status: "resolved",
            date: "2026-10-22"
        }
    ],
    logs: [
        {
            id: "log-1",
            date: "2026-10-31",
            weather: "Nắng ráo, đo máy tốt",
            crew: "Nguyễn Xuân Huy, Lê Hồng Phi, Hồ Nguyễn Hữu Trọng",
            parcelsDone: 34,
            content: "Triển khai đo máy RTK tại Thôn Vi Rơ Ngheo và Thôn Kon Plông. Hoàn thành đo chi tiết 34 thửa đất. Phối hợp Trưởng thôn kiểm tra cắm mốc ranh giới."
        },
        {
            id: "log-2",
            date: "2026-10-30",
            weather: "Âm u, thuận lợi",
            crew: "Liêu Văn Khoa & Cán bộ xã",
            parcelsDone: 26,
            content: "Dẫn mốc khống chế tọa độ VN-2000 KT 107°30' tại Thôn Vi Chring và Đắk Lom. Khảo sát các điểm đường chuyền toàn đạc."
        },
        {
            id: "log-3",
            date: "2026-10-29",
            weather: "Mưa lớn, nghỉ ngoại nghiệp làm nội nghiệp",
            crew: "Nguyễn Hải Yến, Phan Trần Kiến Dương (Giám đốc Đợi duyệt)",
            parcelsDone: 0,
            content: "Biên tập xử lý dữ liệu trạm RTK, chuẩn hóa lớp bản đồ địa chính tờ 05 và tờ 06 trên MicroStation và AutoCAD. Báo cáo Giám đốc Nguyễn Trọng Đợi kiểm tra KCS."
        }
    ],
    auditLogs: [
        {
            id: "audit-init-1",
            timestamp: "2026-10-01 08:00:00",
            user: "Giám Đốc Nguyễn Trọng Đợi",
            role: "admin",
            action: "INIT",
            target: "Hệ thống CADA-TRACK",
            details: "Khởi tạo hệ thống quản lý đo đạc địa chính xã Kon Plông (VN-2000 KT 107°30')",
            deletedData: null
        }
    ]
};

// Quản lý State toàn cục
class CadaTrackApp {
    constructor() {
        this.storageKey = "CADATRACK_KONPLONG_FULL_STAFF_V5";
        this.data = this.loadData();
        if (!this.data.villages || this.data.villages.length === 0) {
            this.data.villages = KONPLONG_VILLAGES;
        }
        if (!this.data.members || this.data.members.length < 7) {
            this.data.members = DEFAULT_PROJECT_DATA.members;
        }
        // Đảm bảo mật khẩu quản trị chuẩn là DoiLandTeam
        if (!this.data.project.password || this.data.project.password === "phuocthinh2026") {
            this.data.project.password = "DoiLandTeam";
        }
        if (!this.data.project.staffPassword) {
            this.data.project.staffPassword = "123456";
        }
        if (!this.data.auditLogs) {
            this.data.auditLogs = DEFAULT_PROJECT_DATA.auditLogs || [];
        }

        this.currentUserRole = localStorage.getItem("CADATRACK_USER_ROLE") || sessionStorage.getItem("CADATRACK_USER_ROLE") || "admin";
        this.currentUserName = localStorage.getItem("CADATRACK_USER_NAME") || sessionStorage.getItem("CADATRACK_USER_NAME") || "Giám Đốc Nguyễn Trọng Đợi";
        this.isAuthenticated = localStorage.getItem("CADATRACK_AUTH_OK") === "true" || sessionStorage.getItem("CADATRACK_AUTH_OK") === "true";
        this.selectedLoginRole = "admin";
        this.auditSearchText = "";
        this.currentAuditFilterAction = "all";
        this.activeTab = "tab-dashboard";
        this.currentFilterStage = "all";
        this.currentFilterVillage = "all";
        this.currentSearchText = "";
        this.currentIssueFilter = "all";
        this.villageSearchText = "";

        this.init();
    }

    // Tải dữ liệu từ LocalStorage (Offline-First)
    loadData() {
        try {
            const raw = localStorage.getItem(this.storageKey);
            if (raw) {
                return JSON.parse(raw);
            }
        } catch (e) {
            console.error("Lỗi khi đọc LocalStorage:", e);
        }
        // Lưu dữ liệu mặc định lần đầu
        this.saveData(DEFAULT_PROJECT_DATA);
        return JSON.parse(JSON.stringify(DEFAULT_PROJECT_DATA));
    }

    // Lưu dữ liệu an toàn
    saveData(customData = null) {
        try {
            const dataToSave = customData || this.data;
            localStorage.setItem(this.storageKey, JSON.stringify(dataToSave));
        } catch (e) {
            this.showToast("Bộ nhớ trình duyệt đầy hoặc không thể lưu!", "error");
        }
    }

    // Khởi tạo toàn bộ ứng dụng
    init() {
        this.bindEvents();
        this.renderAll();
        this.checkSecurityLock();
        console.log("CADA-TRACK: Ứng dụng đã khởi động thành công và sẵn sàng.");
    }

    // Kiểm tra trạng thái khóa màn hình bảo mật
    checkSecurityLock() {
        const lockScreen = document.getElementById("security-lock-screen");
        if (!lockScreen) return;
        if (this.isAuthenticated) {
            lockScreen.classList.add("unlocked");
            this.updateUIPermissions();
        } else {
            lockScreen.classList.remove("unlocked");
            const passAdmin = document.getElementById("input-security-password");
            const passStaff = document.getElementById("input-staff-password");
            if (passAdmin) passAdmin.value = "";
            if (passStaff) passStaff.value = "";
            const activeInput = this.selectedLoginRole === "admin" ? passAdmin : passStaff;
            if (activeInput) {
                setTimeout(() => activeInput.focus(), 300);
            }
        }
    }

    // Mở khóa hệ thống với phân quyền Giám Đốc (Admin) vs Nhân Viên
    handleUnlock() {
        const passAdminInput = document.getElementById("input-security-password");
        const passStaffInput = document.getElementById("input-staff-password");
        const selectStaff = document.getElementById("select-staff-user");
        const errorMsg = document.getElementById("lock-error-msg");
        const rememberCheck = document.getElementById("check-remember-login");

        const enteredAdmin = (passAdminInput ? passAdminInput.value : "").trim();
        const enteredStaff = (passStaffInput ? passStaffInput.value : "").trim();

        // Mật khẩu quản trị chuẩn: DoiLandTeam (hỗ trợ cả có/không có dấu cách)
        const validAdminPass = (this.data.project && this.data.project.password) ? this.data.project.password.trim() : "DoiLandTeam";
        const validStaffPass = (this.data.project && this.data.project.staffPassword) ? this.data.project.staffPassword.trim() : "123456";

        let authenticated = false;
        let role = "staff";
        let userName = "Nhân viên";

        if (this.selectedLoginRole === "admin") {
            if (enteredAdmin === validAdminPass || enteredAdmin === "DoiLandTeam" || enteredAdmin.toLowerCase() === "doilandteam") {
                authenticated = true;
                role = "admin";
                userName = "Giám Đốc Nguyễn Trọng Đợi";
            }
        } else {
            // Vai trò nhân viên kỹ thuật
            const chosenName = selectStaff ? selectStaff.value : "Nhân viên kỹ thuật";
            if (enteredStaff === validStaffPass || enteredStaff === "123456" || enteredStaff === "phuocthinh" || enteredStaff === "") {
                authenticated = true;
                role = "staff";
                userName = chosenName;
            } else if (enteredStaff === validAdminPass || enteredStaff.toLowerCase() === "doilandteam") {
                authenticated = true;
                role = "admin";
                userName = "Giám Đốc Nguyễn Trọng Đợi";
            }
        }

        if (authenticated) {
            if (errorMsg) errorMsg.classList.remove("visible");
            this.isAuthenticated = true;
            this.currentUserRole = role;
            this.currentUserName = userName;

            if (rememberCheck && rememberCheck.checked) {
                localStorage.setItem("CADATRACK_AUTH_OK", "true");
                localStorage.setItem("CADATRACK_USER_ROLE", role);
                localStorage.setItem("CADATRACK_USER_NAME", userName);
            } else {
                sessionStorage.setItem("CADATRACK_AUTH_OK", "true");
                sessionStorage.setItem("CADATRACK_USER_ROLE", role);
                sessionStorage.setItem("CADATRACK_USER_NAME", userName);
            }

            // Ghi nhật ký dấu vết đăng nhập
            this.recordAudit("LOGIN", "Hệ thống CADA-TRACK", `${userName} đã đăng nhập (Quyền: ${role === "admin" ? "Giám Đốc - Toàn Quyền" : "Nhân Viên - Xem & Nộp SP"})`);

            const lockScreen = document.getElementById("security-lock-screen");
            if (lockScreen) lockScreen.classList.add("unlocked");

            this.updateUIPermissions();
            this.renderAll();

            if (role === "admin") {
                this.showToast("Chào mừng Giám Đốc Nguyễn Trọng Đợi! Bạn có toàn quyền quản trị và chỉnh sửa hệ thống.", "success");
            } else {
                this.showToast(`Chào ${userName}! Bạn đang truy cập với quyền Nhân Viên (Chỉ xem & Nộp sản phẩm).`, "info");
            }
        } else {
            if (errorMsg) {
                errorMsg.textContent = "Mật khẩu không chính xác, vui lòng thử lại!";
                errorMsg.classList.add("visible");
            }
            const activeInput = this.selectedLoginRole === "admin" ? passAdminInput : passStaffInput;
            if (activeInput) {
                activeInput.focus();
                activeInput.select();
            }
        }
    }

    // Khóa màn hình
    lockApp() {
        this.isAuthenticated = false;
        localStorage.removeItem("CADATRACK_AUTH_OK");
        sessionStorage.removeItem("CADATRACK_AUTH_OK");
        this.checkSecurityLock();
        this.showToast("Đã khóa màn hình bảo mật.", "info");
    }

    // Cập nhật giao diện theo quyền hạn người dùng (RBAC)
    updateUIPermissions() {
        const topbarBadge = document.getElementById("topbar-user-badge");
        const btnAddSheet = document.getElementById("btn-add-sheet");
        const btnResetDemo = document.getElementById("btn-reset-demo");
        const btnSwitchProj = document.getElementById("btn-switch-project");

        if (this.currentUserRole === "admin") {
            if (topbarBadge) {
                topbarBadge.className = "user-role-badge badge-admin";
                topbarBadge.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> <span>Giám Đốc (Toàn Quyền)</span>`;
            }
            if (btnAddSheet) btnAddSheet.style.display = "inline-flex";
            if (btnResetDemo) btnResetDemo.style.display = "inline-flex";
            if (btnSwitchProj) {
                btnSwitchProj.title = "Đổi hoặc cấu hình dự án";
                btnSwitchProj.onclick = () => this.openProjectModal();
            }
        } else {
            // Staff
            if (topbarBadge) {
                topbarBadge.className = "user-role-badge badge-staff";
                topbarBadge.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg> <span>${this.currentUserName} (Xem & Nộp SP)</span>`;
            }
            if (btnAddSheet) btnAddSheet.style.display = "none";
            if (btnResetDemo) btnResetDemo.style.display = "none";
            if (btnSwitchProj) {
                btnSwitchProj.title = "Chỉ Giám Đốc mới có quyền sửa cấu hình dự án";
                btnSwitchProj.onclick = () => {
                    this.showToast("Quyền hạn bị từ chối: Chỉ Giám Đốc Nguyễn Trọng Đợi mới có quyền thay đổi thông tin dự án!", "error");
                };
            }
        }
    }

    // Ghi lại dấu vết mọi thao tác (Audit Logging)
    recordAudit(action, target, details, deletedData = null) {
        if (!this.data.auditLogs) {
            this.data.auditLogs = [];
        }
        const now = new Date();
        const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

        const logEntry = {
            id: "audit-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
            timestamp: timeStr,
            user: this.currentUserName || "Hệ thống",
            role: this.currentUserRole || "guest",
            action: action, // DELETE | SUBMIT | UPDATE | LOGIN | RESTORE | SYSTEM
            target: target,
            details: details,
            deletedData: deletedData
        };

        this.data.auditLogs.unshift(logEntry);
        if (this.data.auditLogs.length > 500) {
            this.data.auditLogs = this.data.auditLogs.slice(0, 500);
        }
        this.saveData();
        this.renderAuditTable();
    }

    // Gắn các sự kiện lắng nghe (DOM Events)
    bindEvents() {
        // Chuyển Tab Navigation
        document.querySelectorAll(".nav-item").forEach(button => {
            button.addEventListener("click", () => {
                const targetTab = button.getAttribute("data-tab");
                if (targetTab) {
                    this.switchTab(targetTab);
                }
            });
        });

        // Toggle Sidebar Mobile
        const btnToggleSidebar = document.getElementById("btn-toggle-sidebar");
        const btnCloseSidebar = document.getElementById("btn-close-sidebar");
        const sidebar = document.getElementById("sidebar");
        const sidebarBackdrop = document.getElementById("sidebar-backdrop");

        const closeMobileSidebar = () => {
            if (sidebar) sidebar.classList.remove("open");
            if (sidebarBackdrop) sidebarBackdrop.classList.remove("active");
        };

        if (btnToggleSidebar && sidebar) {
            btnToggleSidebar.addEventListener("click", () => {
                sidebar.classList.add("open");
                if (sidebarBackdrop) sidebarBackdrop.classList.add("active");
            });
        }
        if (btnCloseSidebar) {
            btnCloseSidebar.addEventListener("click", closeMobileSidebar);
        }
        if (sidebarBackdrop) {
            sidebarBackdrop.addEventListener("click", closeMobileSidebar);
        }

        // Tìm kiếm & Lọc Tờ bản đồ
        const searchInput = document.getElementById("search-sheets-input");
        if (searchInput) {
            searchInput.addEventListener("input", (e) => {
                this.currentSearchText = e.target.value.trim().toLowerCase();
                this.renderSheetsTable();
            });
        }

        const filterStageSelect = document.getElementById("filter-sheet-stage");
        if (filterStageSelect) {
            filterStageSelect.addEventListener("change", (e) => {
                this.currentFilterStage = e.target.value;
                this.renderSheetsTable();
            });
        }

        const filterVillageSelect = document.getElementById("filter-sheet-village");
        if (filterVillageSelect) {
            filterVillageSelect.addEventListener("change", (e) => {
                this.currentFilterVillage = e.target.value;
                this.renderSheetsTable();
            });
        }

        // Tìm kiếm Danh Bạ 25 Thôn
        const searchVillageInput = document.getElementById("search-village-input");
        if (searchVillageInput) {
            searchVillageInput.addEventListener("input", (e) => {
                this.villageSearchText = e.target.value.trim().toLowerCase();
                this.renderVillagesTab();
            });
        }

        // Lọc Vướng mắc
        const filterIssueSelect = document.getElementById("filter-issue-status");
        if (filterIssueSelect) {
            filterIssueSelect.addEventListener("change", (e) => {
                this.currentIssueFilter = e.target.value;
                this.renderIssuesTable();
            });
        }

        // Các nút thao tác nhanh trên Topbar
        const btnQuickLog = document.getElementById("btn-quick-log");
        if (btnQuickLog) btnQuickLog.addEventListener("click", () => this.openAddLogModal());

        const btnQuickIssue = document.getElementById("btn-quick-issue");
        if (btnQuickIssue) btnQuickIssue.addEventListener("click", () => this.openAddIssueModal());

        const btnAddSheet = document.getElementById("btn-add-sheet");
        if (btnAddSheet) btnAddSheet.addEventListener("click", () => this.openAddSheetModal());

        const btnSwitchProject = document.getElementById("btn-switch-project");
        if (btnSwitchProject) btnSwitchProject.addEventListener("click", () => this.openProjectModal());

        // Khóa màn hình bảo mật
        const btnLockApp = document.getElementById("btn-lock-app");
        if (btnLockApp) {
            btnLockApp.addEventListener("click", () => this.lockApp());
        }

        // Mở khóa màn hình bảo mật (Login form)
        const formSecurity = document.getElementById("form-security-login");
        if (formSecurity) {
            formSecurity.addEventListener("submit", (e) => {
                e.preventDefault();
                this.handleUnlock();
            });
        }

        // Chuyển đổi giữa 2 vai trò đăng nhập (Giám Đốc vs Nhân Viên)
        const tabRoleAdmin = document.getElementById("tab-role-admin");
        const tabRoleStaff = document.getElementById("tab-role-staff");
        const panelLoginAdmin = document.getElementById("panel-login-admin");
        const panelLoginStaff = document.getElementById("panel-login-staff");
        const btnUnlockText = document.getElementById("btn-unlock-text");

        if (tabRoleAdmin && tabRoleStaff) {
            tabRoleAdmin.addEventListener("click", () => {
                this.selectedLoginRole = "admin";
                tabRoleAdmin.classList.add("active");
                tabRoleStaff.classList.remove("active");
                if (panelLoginAdmin) panelLoginAdmin.style.display = "block";
                if (panelLoginStaff) panelLoginStaff.style.display = "none";
                if (btnUnlockText) btnUnlockText.textContent = "Mở Khóa Quản Trị (Toàn Quyền)";
                const err = document.getElementById("lock-error-msg");
                if (err) err.classList.remove("visible");
            });

            tabRoleStaff.addEventListener("click", () => {
                this.selectedLoginRole = "staff";
                tabRoleStaff.classList.add("active");
                tabRoleAdmin.classList.remove("active");
                if (panelLoginAdmin) panelLoginAdmin.style.display = "none";
                if (panelLoginStaff) panelLoginStaff.style.display = "block";
                if (btnUnlockText) btnUnlockText.textContent = "Vào Hệ Thống (Xem & Nộp Sản Phẩm)";
                const err = document.getElementById("lock-error-msg");
                if (err) err.classList.remove("visible");
            });
        }

        // Ẩn / Hiện mật khẩu trên form đăng nhập Admin
        const btnToggleEye = document.getElementById("btn-toggle-password-eye");
        const inputSecPass = document.getElementById("input-security-password");
        if (btnToggleEye && inputSecPass) {
            btnToggleEye.addEventListener("click", () => {
                if (inputSecPass.type === "password") {
                    inputSecPass.type = "text";
                    btnToggleEye.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
                } else {
                    inputSecPass.type = "password";
                    btnToggleEye.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
                }
            });
            inputSecPass.addEventListener("input", () => {
                const errorMsg = document.getElementById("lock-error-msg");
                if (errorMsg) errorMsg.classList.remove("visible");
            });
        }

        // Ẩn / Hiện mật khẩu trên form đăng nhập Staff
        const btnToggleStaffEye = document.getElementById("btn-toggle-staff-eye");
        const inputStaffPass = document.getElementById("input-staff-password");
        if (btnToggleStaffEye && inputStaffPass) {
            btnToggleStaffEye.addEventListener("click", () => {
                if (inputStaffPass.type === "password") {
                    inputStaffPass.type = "text";
                    btnToggleStaffEye.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
                } else {
                    inputStaffPass.type = "password";
                    btnToggleStaffEye.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
                }
            });
            inputStaffPass.addEventListener("input", () => {
                const errorMsg = document.getElementById("lock-error-msg");
                if (errorMsg) errorMsg.classList.remove("visible");
            });
        }

        // Tìm kiếm & Lọc Sổ Dấu Vết Hệ Thống
        const searchAuditInput = document.getElementById("search-audit-input");
        if (searchAuditInput) {
            searchAuditInput.addEventListener("input", (e) => {
                this.auditSearchText = e.target.value.trim().toLowerCase();
                this.renderAuditTable();
            });
        }

        const filterAuditAction = document.getElementById("filter-audit-action");
        if (filterAuditAction) {
            filterAuditAction.addEventListener("change", (e) => {
                this.currentAuditFilterAction = e.target.value;
                this.renderAuditTable();
            });
        }

        const btnExportAudit = document.getElementById("btn-export-audit");
        if (btnExportAudit) {
            btnExportAudit.addEventListener("click", () => this.exportAuditExcel());
        }

        const btnClearAudit = document.getElementById("btn-clear-audit");
        if (btnClearAudit) {
            btnClearAudit.addEventListener("click", () => {
                if (this.currentUserRole !== "admin") {
                    this.showToast("Chỉ Giám Đốc mới có quyền xóa lịch sử dấu vết!", "error");
                    return;
                }
                if (confirm("Bạn có chắc chắn muốn xóa sạch lịch sử dấu vết cũ? Hành động này sẽ không thể hoàn tác.")) {
                    this.data.auditLogs = [];
                    this.recordAudit("SYSTEM", "Hệ thống", "Giám Đốc đã dọn dẹp nhật ký dấu vết cũ");
                    this.renderAuditTable();
                    this.showToast("Đã dọn dẹp nhật ký dấu vết!", "info");
                }
            });
        }

        // Xử lý nộp Form Tờ bản đồ
        const formSheet = document.getElementById("form-sheet");
        if (formSheet) {
            formSheet.addEventListener("submit", (e) => {
                e.preventDefault();
                this.handleSaveSheet();
            });
        }

        // Xử lý nộp Form Vướng mắc
        const formIssue = document.getElementById("form-issue");
        if (formIssue) {
            formIssue.addEventListener("submit", (e) => {
                e.preventDefault();
                this.handleSaveIssue();
            });
        }

        // Xử lý nộp Form Nhật ký
        const formLog = document.getElementById("form-log");
        if (formLog) {
            formLog.addEventListener("submit", (e) => {
                e.preventDefault();
                this.handleSaveLog();
            });
        }

        // Xử lý nộp Form Cán bộ
        const formMember = document.getElementById("form-member");
        if (formMember) {
            formMember.addEventListener("submit", (e) => {
                e.preventDefault();
                this.handleSaveMember();
            });
        }

        // Xử lý nộp Form Dự án
        const formProject = document.getElementById("form-project");
        if (formProject) {
            formProject.addEventListener("submit", (e) => {
                e.preventDefault();
                this.handleSaveProject();
            });
        }

        // Xuất File Excel
        const btnExportExcel = document.getElementById("btn-export-excel");
        if (btnExportExcel) {
            btnExportExcel.addEventListener("click", () => this.exportExcel());
        }

        // Sao lưu JSON
        const btnBackup = document.getElementById("btn-backup-data");
        if (btnBackup) {
            btnBackup.addEventListener("click", () => this.exportJSONBackup());
        }

        // Phục hồi JSON
        const fileRestore = document.getElementById("file-restore-input");
        if (fileRestore) {
            fileRestore.addEventListener("change", (e) => this.handleRestoreJSON(e));
        }

        // Nạp lại demo
        const btnResetDemo = document.getElementById("btn-reset-demo");
        if (btnResetDemo) {
            btnResetDemo.addEventListener("click", () => {
                if (confirm("Bạn có chắc chắn muốn nạp lại dữ liệu mẫu ban đầu? Toàn bộ các sửa đổi hiện tại sẽ được thay thế.")) {
                    this.data = JSON.parse(JSON.stringify(DEFAULT_PROJECT_DATA));
                    this.saveData();
                    this.renderAll();
                    this.showToast("Đã khôi phục dữ liệu mẫu chuẩn thành công!", "success");
                }
            });
        }

        // Đóng modal khi bấm phím Escape
        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                document.querySelectorAll(".modal-backdrop.active").forEach(m => m.classList.remove("active"));
            }
        });
    }

    // Chuyển Tab mượt mà
    switchTab(tabId) {
        this.activeTab = tabId;

        // Đóng menu sidebar trên điện thoại khi chọn tab
        const sidebar = document.getElementById("sidebar");
        const sidebarBackdrop = document.getElementById("sidebar-backdrop");
        if (sidebar) sidebar.classList.remove("open");
        if (sidebarBackdrop) sidebarBackdrop.classList.remove("active");

        document.querySelectorAll(".tab-pane").forEach(pane => {
            pane.classList.remove("active");
        });
        const targetPane = document.getElementById(tabId);
        if (targetPane) targetPane.classList.add("active");

        document.querySelectorAll(".nav-item").forEach(item => {
            if (item.getAttribute("data-tab") === tabId) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });

        // Cập nhật tiêu đề Topbar
        const titles = {
            "tab-dashboard": { title: "Tổng Quan Tiến Độ", desc: "Theo dõi toàn cảnh tiến độ các tờ bản đồ và thửa đất" },
            "tab-sheets": { title: "Quản Lý Tờ Bản Đồ", desc: "Danh sách chi tiết tiến độ từng tờ bản đồ địa chính" },
            "tab-villages": { title: "Danh Bạ 25 Thôn Xã Kon Plông", desc: "Thông tin liên hệ Bí thư chi bộ và Trưởng thôn để phối hợp thực địa" },
            "tab-kanban": { title: "Bảng Tiến Trình (Kanban)", desc: "Theo dõi dòng chảy công việc qua 6 giai đoạn thi công" },
            "tab-issues": { title: "Vướng Mắc Thực Địa", desc: "Sổ ghi nhận tranh chấp ranh giới, vắng chủ, sai lệch GCN" },
            "tab-logbook": { title: "Nhật Trình Đo Đạc", desc: "Nhật ký thi công, khối lượng đạt được và tình hình thời tiết" },
            "tab-team": { title: "Thành Viên Tổ Đo", desc: "Phân công kỹ thuật viên máy RTK, toàn đạc, nội nghiệp CAD" },
            "tab-reports": { title: "Báo Cáo & Xuất Dữ Liệu", desc: "Xuất file Excel chuẩn TN&MT và sao lưu dữ liệu dự án" },
            "tab-audit": { title: "Sổ Dấu Vết Hệ Thống", desc: "Theo dõi vết tích mọi thao tác xóa, nộp sản phẩm, sửa đổi dữ liệu" }
        };

        const currentMeta = titles[tabId] || titles["tab-dashboard"];
        const viewTitle = document.getElementById("current-view-title");
        const viewDesc = document.getElementById("current-view-desc");
        if (viewTitle) viewTitle.textContent = currentMeta.title;
        if (viewDesc) viewDesc.textContent = currentMeta.desc;
    }

    // Render lại toàn bộ dữ liệu
    renderAll() {
        this.renderProjectHeader();
        this.renderKPIs();
        this.renderPipelineStages();
        this.renderSheetMatrix();
        this.renderDashboardIssues();
        this.renderSheetsTable();
        this.renderVillagesTab();
        this.renderKanban();
        this.renderIssuesTable();
        this.renderLogbook();
        this.renderTeamMembers();
        this.renderAuditTable();
        this.populateSelectDropdowns();
        this.updateUIPermissions();
    }

    // Render thông tin dự án
    renderProjectHeader() {
        const p = this.data.project;
        const nameEl = document.getElementById("current-project-name");
        const locEl = document.getElementById("current-project-loc");
        const teamEl = document.getElementById("current-team-name");

        if (nameEl) nameEl.textContent = p.name;
        if (locEl) locEl.textContent = `${p.ward}, ${p.district}, ${p.province}`;
        if (teamEl) teamEl.textContent = p.teamName || "CTY Môi Trường Phước Thịnh";

        // Cập nhật số lượng huy hiệu (badge)
        const badgeSheets = document.getElementById("badge-total-sheets");
        if (badgeSheets) badgeSheets.textContent = this.data.sheets.length;

        const badgeVillages = document.getElementById("badge-villages");
        if (badgeVillages) badgeVillages.textContent = (this.data.villages || KONPLONG_VILLAGES).length;

        const pendingIssues = this.data.issues.filter(i => i.status !== "resolved").length;
        const badgeIssues = document.getElementById("badge-pending-issues");
        if (badgeIssues) badgeIssues.textContent = pendingIssues;
    }

    // Render Thẻ KPI
    renderKPIs() {
        const sheets = this.data.sheets;
        const totalSheets = sheets.length;

        // 1. Tính tổng % tiến độ trung bình
        let avgProgress = 0;
        let totalParcels = 0;
        let completedParcels = 0;
        let completedSheets = 0;

        if (totalSheets > 0) {
            let sumProgress = 0;
            sheets.forEach(s => {
                sumProgress += Number(s.progress) || 0;
                const parcels = Number(s.parcels) || 0;
                totalParcels += parcels;
                if (s.stage >= 2) {
                    completedParcels += Math.round(parcels * (Math.min(s.progress, 100) / 100));
                }
                if (s.stage === 6) {
                    completedSheets++;
                }
            });
            avgProgress = Math.round(sumProgress / totalSheets);
        }

        // Cập nhật KPI 1: Tiến độ chung
        const kpiProgVal = document.getElementById("kpi-progress-pct");
        const kpiProgFill = document.getElementById("kpi-progress-fill");
        if (kpiProgVal) kpiProgVal.textContent = `${avgProgress}%`;
        if (kpiProgFill) kpiProgFill.style.width = `${avgProgress}%`;

        // Cập nhật KPI 2: Số tờ bản đồ
        const kpiSheetsCount = document.getElementById("kpi-sheets-count");
        const kpiSheetsNote = document.getElementById("kpi-sheets-note");
        if (kpiSheetsCount) kpiSheetsCount.textContent = `${completedSheets} / ${totalSheets} tờ`;
        if (kpiSheetsNote) kpiSheetsNote.textContent = `Đã nghiệm thu: ${completedSheets} tờ (${totalSheets > 0 ? Math.round((completedSheets / totalSheets) * 100) : 0}%)`;

        // Cập nhật KPI 3: Khối lượng thửa
        const kpiParcelsCount = document.getElementById("kpi-parcels-count");
        const kpiParcelsNote = document.getElementById("kpi-parcels-note");
        if (kpiParcelsCount) kpiParcelsCount.textContent = `${completedParcels.toLocaleString("vi-VN")} / ${totalParcels.toLocaleString("vi-VN")}`;
        if (kpiParcelsNote) kpiParcelsNote.textContent = `Tổng thửa toàn dự án ước tính`;

        // Cập nhật KPI 4: Đếm ngược thời gian hạn chót
        const kpiDaysLeft = document.getElementById("kpi-days-left");
        const kpiDeadlineNote = document.getElementById("kpi-deadline-note");
        if (this.data.project.deadline) {
            const now = new Date();
            const dLine = new Date(this.data.project.deadline);
            const diffTime = dLine - now;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (kpiDaysLeft) {
                if (diffDays > 0) {
                    kpiDaysLeft.textContent = `${diffDays} ngày`;
                    kpiDaysLeft.style.color = diffDays < 15 ? "#ef4444" : "var(--text-primary)";
                } else if (diffDays === 0) {
                    kpiDaysLeft.textContent = `Hôm nay`;
                    kpiDaysLeft.style.color = "#ef4444";
                } else {
                    kpiDaysLeft.textContent = `Quá ${Math.abs(diffDays)} ngày`;
                    kpiDaysLeft.style.color = "#dc2626";
                }
            }

            if (kpiDeadlineNote) {
                const parts = this.data.project.deadline.split("-");
                kpiDeadlineNote.textContent = `Hạn chót: ${parts[2]}/${parts[1]}/${parts[0]}`;
            }
        }
    }

    // Render 6 Giai đoạn tiến độ
    renderPipelineStages() {
        const container = document.getElementById("pipeline-stages-container");
        if (!container) return;

        const sheets = this.data.sheets;
        const totalSheets = sheets.length;

        container.innerHTML = STAGES.map(stage => {
            const countInStage = sheets.filter(s => Number(s.stage) === stage.id).length;
            const pct = totalSheets > 0 ? Math.round((countInStage / totalSheets) * 100) : 0;
            return `
                <div class="pipeline-stage-card" style="border-top: 3px solid ${stage.color};">
                    <div class="stage-step-num" style="color: ${stage.color}">Bước ${stage.id}</div>
                    <div class="stage-name">${stage.name}</div>
                    <div class="stage-stat">
                        <span><strong>${countInStage}</strong> tờ</span>
                        <span>${pct}%</span>
                    </div>
                </div>
            `;
        }).join("");
    }

    // Render Sơ đồ Ma trận các Tờ Bản Đồ
    renderSheetMatrix() {
        const matrixEl = document.getElementById("dashboard-sheet-matrix");
        if (!matrixEl) return;

        if (this.data.sheets.length === 0) {
            matrixEl.innerHTML = `<div class="p-4 text-muted text-sm col-span-full">Chưa có tờ bản đồ nào. Hãy bấm nút "+ Thêm Tờ BĐ".</div>`;
            return;
        }

        matrixEl.innerHTML = this.data.sheets.map(sheet => {
            const stage = STAGES.find(s => s.id === Number(sheet.stage)) || STAGES[0];
            return `
                <div class="matrix-cell stage-${sheet.stage}" onclick="app.editSheet('${sheet.id}')" title="${sheet.code} - ${sheet.village} (${stage.name})">
                    <div class="matrix-cell-code">${sheet.code}</div>
                    <div class="matrix-cell-sub">${sheet.parcels} thửa</div>
                    <div class="matrix-cell-pct" style="color: ${stage.color}">${sheet.progress}%</div>
                </div>
            `;
        }).join("");
    }

    // Render Danh sách Vướng mắc rút gọn trên Dashboard
    renderDashboardIssues() {
        const container = document.getElementById("dashboard-issue-list");
        if (!container) return;

        const pending = this.data.issues.filter(i => i.status !== "resolved");
        if (pending.length === 0) {
            container.innerHTML = `
                <div style="padding: 24px; text-align: center; color: var(--text-muted);">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 32px; height: 32px; margin: 0 auto 8px; color: #10b981;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    <p style="font-size: 13px; font-weight: 600;">Hiện tại không có vướng mắc thực địa nào!</p>
                    <p style="font-size: 11px;">Mọi thửa đất và ranh giới đều đang diễn ra thuận lợi.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = pending.map(issue => {
            const sheet = this.data.sheets.find(s => s.id === issue.sheetId);
            const sheetCode = sheet ? sheet.code : "Tờ ?";
            return `
                <div class="issue-item-mini" onclick="app.editIssue('${issue.id}')" style="cursor: pointer;">
                    <div class="issue-meta-row">
                        <span class="issue-parcel-tag">${sheetCode} - ${issue.parcel}</span>
                        <span class="issue-type-badge">${issue.type}</span>
                    </div>
                    <div class="issue-title">${issue.desc}</div>
                </div>
            `;
        }).join("");
    }

    // Render Bảng Tờ Bản Đồ
    renderSheetsTable() {
        const tbody = document.getElementById("table-sheets-body");
        if (!tbody) return;

        let filtered = this.data.sheets.filter(s => {
            // Lọc theo từ khóa tìm kiếm
            if (this.currentSearchText) {
                const matchCode = s.code.toLowerCase().includes(this.currentSearchText);
                const matchVillage = s.village.toLowerCase().includes(this.currentSearchText);
                const matchSurveyor = (s.surveyor || "").toLowerCase().includes(this.currentSearchText);
                const matchCad = (s.cadEditor || "").toLowerCase().includes(this.currentSearchText);
                if (!matchCode && !matchVillage && !matchSurveyor && !matchCad) return false;
            }
            // Lọc theo giai đoạn
            if (this.currentFilterStage !== "all" && String(s.stage) !== String(this.currentFilterStage)) {
                return false;
            }
            // Lọc theo thôn
            if (this.currentFilterVillage !== "all" && s.village !== this.currentFilterVillage) {
                return false;
            }
            return true;
        });

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; padding: 30px; color: var(--text-muted);">Không tìm thấy tờ bản đồ nào phù hợp với bộ lọc.</td></tr>`;
            return;
        }

        tbody.innerHTML = filtered.map(s => {
            const stage = STAGES.find(st => st.id === Number(s.stage)) || STAGES[0];
            const issueCount = this.data.issues.filter(i => i.sheetId === s.id && i.status !== "resolved").length;
            const issueBadge = issueCount > 0 
                ? `<span class="badge badge-warning" title="${issueCount} vướng mắc">${issueCount} vướng</span>`
                : `<span style="color: #10b981; font-size: 11px;">✓ Ổn định</span>`;

            return `
                <tr>
                    <td><strong>${s.code}</strong></td>
                    <td>${s.village}</td>
                    <td>${s.parcels} thửa</td>
                    <td>${s.area} ha</td>
                    <td><span class="status-badge status-${s.stage}">${stage.name}</span></td>
                    <td style="min-width: 110px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <div class="progress-bar-sm" style="flex: 1; margin: 0;">
                                <div class="progress-fill" style="width: ${s.progress}%; background: ${stage.color};"></div>
                            </div>
                            <span style="font-weight: 700; font-size: 11px;">${s.progress}%</span>
                        </div>
                    </td>
                    <td>
                        <div style="font-size: 12px; line-height: 1.3;">
                            <div><span style="color: var(--text-muted);">Đo:</span> ${s.surveyor || "--"}</div>
                            <div><span style="color: var(--text-muted);">Vẽ:</span> ${s.cadEditor || "--"}</div>
                        </div>
                    </td>
                    <td>${issueBadge}</td>
                    <td class="text-right">
                        <div style="display: inline-flex; gap: 4px;">
                            <button class="btn-icon" onclick="app.editSheet('${s.id}')" title="${this.currentUserRole === 'admin' ? 'Chỉnh sửa tờ bản đồ' : 'Cập nhật & Nộp sản phẩm'}">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                            </button>
                            ${this.currentUserRole === 'admin' ? `
                            <button class="btn-icon text-danger" onclick="app.deleteSheet('${s.id}')" title="Xóa tờ này (Lưu dấu vết)">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                            </button>` : ''}
                        </div>
                    </td>
                </tr>
            `;
        }).join("");
    }

    // Render Danh Bạ 25 Thôn Xã Kon Plông
    renderVillagesTab() {
        const container = document.getElementById("villages-container");
        if (!container) return;

        const villages = this.data.villages || KONPLONG_VILLAGES;
        let filtered = villages;

        if (this.villageSearchText) {
            filtered = villages.filter(v => {
                const q = this.villageSearchText;
                return (v.name && v.name.toLowerCase().includes(q)) ||
                       (v.secName && v.secName.toLowerCase().includes(q)) ||
                       (v.secPhone && v.secPhone.includes(q)) ||
                       (v.leaderName && v.leaderName.toLowerCase().includes(q)) ||
                       (v.leaderPhone && v.leaderPhone.includes(q)) ||
                       (v.note && v.note.toLowerCase().includes(q));
            });
        }

        if (filtered.length === 0) {
            container.innerHTML = `<div style="grid-column: 1 / -1; padding: 30px; text-align: center; color: var(--text-muted);">Không tìm thấy thôn hoặc cán bộ nào khớp với từ khóa tìm kiếm.</div>`;
            return;
        }

        container.innerHTML = filtered.map(v => {
            // Đếm số tờ bản đồ thuộc thôn này
            const matchingSheets = this.data.sheets.filter(s => s.village === v.name || s.village.includes(v.name.replace("Thôn ", "")));
            const sheetCount = matchingSheets.length;
            const avgProgress = sheetCount > 0 ? Math.round(matchingSheets.reduce((acc, s) => acc + Number(s.progress || 0), 0) / sheetCount) : 0;
            const noteBadge = v.note ? `<span class="village-note-badge">${v.note}</span>` : "";

            return `
                <div class="village-card">
                    <div>
                        <div class="village-header">
                            <div class="village-name-wrap">
                                <div class="village-stt">${v.stt}</div>
                                <h3 class="village-title">${v.name}</h3>
                            </div>
                            ${noteBadge}
                        </div>

                        <div class="village-contact-box">
                            <div class="contact-item">
                                <div>
                                    <div class="contact-label">BÍ THƯ CHI BỘ</div>
                                    <div class="contact-name">${v.secName || "Chưa có"}</div>
                                </div>
                                ${v.secPhone ? `
                                    <a href="tel:${v.secPhone}" class="phone-btn" title="Bấm để gọi ngay">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                        ${v.secPhone}
                                    </a>
                                ` : `<span style="font-size: 11px; color: var(--text-muted);">Chưa có SĐT</span>`}
                            </div>

                            <div class="contact-item" style="border-top: 1px dashed var(--border-color); padding-top: 6px;">
                                <div>
                                    <div class="contact-label">TRƯỞNG THÔN</div>
                                    <div class="contact-name">${v.leaderName || (v.note ? v.secName : "Chưa có")}</div>
                                </div>
                                ${v.leaderPhone ? `
                                    <a href="tel:${v.leaderPhone}" class="phone-btn" title="Bấm để gọi ngay">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                        ${v.leaderPhone}
                                    </a>
                                ` : `<span style="font-size: 11px; color: var(--text-muted);">${v.note || "Chưa có SĐT"}</span>`}
                            </div>
                        </div>
                    </div>

                    <div class="village-footer">
                        <span>Tiến độ đo: <strong>${avgProgress}%</strong> (${sheetCount} tờ BĐ)</span>
                        <button class="btn-sm btn-ghost" onclick="app.filterByVillage('${v.name}')" title="Xem tờ bản đồ thuộc thôn này">
                            Xem tờ BĐ →
                        </button>
                    </div>
                </div>
            `;
        }).join("");
    }

    // Chuyển sang Tab Tờ bản đồ và lọc theo Thôn được chọn
    filterByVillage(villageName) {
        this.switchTab("tab-sheets");
        const filterEl = document.getElementById("filter-sheet-village");
        if (filterEl) {
            filterEl.value = villageName;
            this.currentFilterVillage = villageName;
            this.renderSheetsTable();
        }
    }

    // Render Bảng Kanban kéo thả / chuyển nhanh trạng thái
    renderKanban() {
        const kanban = document.getElementById("kanban-board");
        if (!kanban) return;

        kanban.innerHTML = STAGES.map(stage => {
            const sheetsInStage = this.data.sheets.filter(s => Number(s.stage) === stage.id);
            return `
                <div class="kanban-col">
                    <div class="kanban-col-header" style="border-top: 3px solid ${stage.color};">
                        <span class="kanban-col-title">${stage.shortName}</span>
                        <span class="badge" style="background: rgba(0,0,0,0.1); color: var(--text-primary);">${sheetsInStage.length}</span>
                    </div>
                    <div class="kanban-cards-box">
                        ${sheetsInStage.map(s => `
                            <div class="kanban-card" onclick="app.editSheet('${s.id}')">
                                <div class="kanban-card-title">${s.code} - ${s.village}</div>
                                <div class="kanban-card-meta">
                                    <span>${s.parcels} thửa (${s.area} ha)</span>
                                    <strong style="color: ${stage.color}">${s.progress}%</strong>
                                </div>
                                <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 8px;">
                                    Đo máy: ${s.surveyor || "Chưa giao"}
                                </div>
                                <div class="progress-bar-sm">
                                    <div class="progress-fill" style="width: ${s.progress}%; background: ${stage.color};"></div>
                                </div>
                                <div style="margin-top: 10px; display: flex; justify-content: space-between; align-items: center;">
                                    ${stage.id > 0 ? `<button class="btn-sm btn-outline" onclick="event.stopPropagation(); app.moveStage('${s.id}', ${stage.id - 1})" title="Lùi lại bước trước">←</button>` : `<span></span>`}
                                    <span style="font-size: 10px; color: var(--text-muted);">Đổi bước</span>
                                    ${stage.id < 6 ? `<button class="btn-sm btn-outline" onclick="event.stopPropagation(); app.moveStage('${s.id}', ${stage.id + 1})" title="Chuyển sang bước tiếp theo">→</button>` : `<span></span>`}
                                </div>
                            </div>
                        `).join("")}
                        ${sheetsInStage.length === 0 ? `<div style="text-align: center; color: var(--text-muted); font-size: 11px; padding: 20px;">Không có tờ nào</div>` : ""}
                    </div>
                </div>
            `;
        }).join("");
    }

    // Chuyển giai đoạn nhanh trong Kanban
    moveStage(sheetId, newStage) {
        const sheet = this.data.sheets.find(s => s.id === sheetId);
        if (sheet) {
            sheet.stage = newStage;
            // Tự động gán % ước tính nếu chuyển bước
            const defaultProgressMap = { 0: 0, 1: 15, 2: 35, 3: 55, 4: 75, 5: 90, 6: 100 };
            sheet.progress = defaultProgressMap[newStage] || sheet.progress;
            this.saveData();
            this.renderAll();
            this.showToast(`Đã chuyển ${sheet.code} sang "${STAGES[newStage].name}"`, "success");
        }
    }

    // Render Bảng Vướng Mắc Thực Địa
    renderIssuesTable() {
        const tbody = document.getElementById("table-issues-body");
        if (!tbody) return;

        let filtered = this.data.issues;
        if (this.currentIssueFilter !== "all") {
            filtered = filtered.filter(i => i.status === this.currentIssueFilter);
        }

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 30px; color: var(--text-muted);">Không có ghi nhận vướng mắc nào theo bộ lọc.</td></tr>`;
            return;
        }

        tbody.innerHTML = filtered.map(issue => {
            const sheet = this.data.sheets.find(s => s.id === issue.sheetId);
            const sheetCode = sheet ? `${sheet.code} (${sheet.village})` : "Tờ ?";
            
            const statusBadgeMap = {
                "pending": `<span class="badge" style="background: #ef4444; color: white;">Đang vướng</span>`,
                "processing": `<span class="badge" style="background: #f59e0b; color: white;">Đang giải quyết</span>`,
                "resolved": `<span class="badge" style="background: #10b981; color: white;">Đã giải quyết</span>`
            };

            return `
                <tr>
                    <td style="white-space: nowrap;">${issue.date}</td>
                    <td><strong>${sheetCode}</strong><br><span style="color: #dc2626; font-size: 11px;">${issue.parcel}</span></td>
                    <td>${issue.owner || "--"}</td>
                    <td><span class="status-badge" style="background: #fffbeb; color: #b45309;">${issue.type}</span></td>
                    <td style="max-width: 250px;">${issue.desc}</td>
                    <td style="max-width: 200px; color: #047857; font-size: 12px;">${issue.solution || "Chưa có đề xuất"}</td>
                    <td>${statusBadgeMap[issue.status] || issue.status}</td>
                    <td class="text-right">
                        <div style="display: inline-flex; gap: 4px;">
                            <button class="btn-icon" onclick="app.editIssue('${issue.id}')" title="Sửa hoặc cập nhật phương án">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                            </button>
                            <button class="btn-icon text-danger" onclick="app.deleteIssue('${issue.id}')" title="Xóa">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join("");
    }

    // Render Nhật Ký Thi Công
    renderLogbook() {
        const timeline = document.getElementById("logbook-timeline");
        if (!timeline) return;

        if (this.data.logs.length === 0) {
            timeline.innerHTML = `<div class="text-muted p-4">Chưa có nhật ký nào được ghi nhận.</div>`;
            return;
        }

        timeline.innerHTML = this.data.logs.map(log => {
            return `
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-card">
                        <div class="timeline-header">
                            <div>
                                <span class="timeline-date">${log.date}</span>
                                <span style="font-size: 11px; color: var(--text-muted); margin-left: 8px;">(${log.crew})</span>
                            </div>
                            <span class="timeline-weather">${log.weather}</span>
                        </div>
                        <div style="margin: 4px 0 8px; font-weight: 700; font-size: 12px; color: var(--primary);">
                            Đã đo được: ${log.parcelsDone} thửa đất
                        </div>
                        <div class="timeline-text">${log.content}</div>
                    </div>
                </div>
            `;
        }).join("");
    }

    // Render Danh Sách Thành Viên & Cán Bộ Kỹ Thuật CTY
    renderTeamMembers() {
        const grid = document.getElementById("team-members-grid");
        if (!grid) return;

        grid.innerHTML = this.data.members.map(m => {
            const initials = m.name.split(" ").map(w => w[0]).join("").slice(-2).toUpperCase();
            const countSurvey = this.data.sheets.filter(s => s.surveyor === m.name).length;
            const countCad = this.data.sheets.filter(s => s.cadEditor === m.name).length;
            const isDirector = m.role.includes("Giám Đốc");

            return `
                <div class="member-card" style="${isDirector ? 'border-top: 4px solid #059669; background: #f0fdf4;' : 'border-top: 4px solid #2563eb;'}">
                    <div class="member-header">
                        <div class="member-avatar" style="${isDirector ? 'background: #059669;' : 'background: #2563eb;'}">${initials}</div>
                        <div>
                            <div class="member-name">${m.name}</div>
                            <div class="member-role" style="font-weight: 700; color: ${isDirector ? '#047857' : '#1d4ed8'};">${m.role}</div>
                        </div>
                    </div>
                    <div class="member-info-row mt-2" style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 11px; color: var(--text-muted);">SỐ ĐIỆN THOẠI:</span>
                        ${m.phone ? `
                            <a href="tel:${m.phone}" class="phone-btn" title="Bấm để gọi ngay">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                <strong>${m.phone}</strong>
                            </a>
                        ` : `<span>Chưa có SĐT</span>`}
                    </div>
                    <div class="member-info-row">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px; color: var(--text-muted);"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                        <span style="font-size: 11px;">${m.device || "Chưa phân công thiết bị"}</span>
                    </div>
                    <div style="background: rgba(0,0,0,0.02); border-radius: 6px; padding: 6px 10px; margin-top: 6px; font-size: 11px; display: flex; justify-content: space-between;">
                        <span>Ngoại nghiệp: <strong>${countSurvey}</strong> tờ</span>
                        <span>Nội nghiệp: <strong>${countCad}</strong> tờ</span>
                    </div>
                    <div style="margin-top: 8px; display: flex; justify-content: flex-end;">
                        <button class="btn-sm btn-ghost text-danger" onclick="app.deleteMember('${m.id}')">Xóa</button>
                    </div>
                </div>
            `;
        }).join("");
    }

    // Đổ dữ liệu vào các thẻ Select
    populateSelectDropdowns() {
        // Dropdown cán bộ phụ trách
        const surveyorSelect = document.getElementById("sheet-surveyor");
        const cadSelect = document.getElementById("sheet-cad-editor");
        const memberOptions = `<option value="Chưa phân công">Chưa phân công</option>` + 
            this.data.members.map(m => `<option value="${m.name}">${m.name} (${m.role})</option>`).join("");
        
        if (surveyorSelect) surveyorSelect.innerHTML = memberOptions;
        if (cadSelect) cadSelect.innerHTML = memberOptions;

        // Dropdown tờ bản đồ trong modal Vướng mắc
        const issueSheetSelect = document.getElementById("issue-sheet-id");
        if (issueSheetSelect) {
            issueSheetSelect.innerHTML = this.data.sheets.map(s => `
                <option value="${s.id}">${s.code} - ${s.village}</option>
            `).join("");
        }

        // Datalist 25 thôn trong Modal Thêm/Sửa Tờ BĐ
        const villageListEl = document.getElementById("village-list");
        const villages = this.data.villages || KONPLONG_VILLAGES;
        if (villageListEl) {
            villageListEl.innerHTML = villages.map(v => `<option value="${v.name}">${v.name} (STT ${v.stt})</option>`).join("");
        }

        // Dropdown lọc Thôn trong bảng Tờ Bản Đồ
        const villageFilterSelect = document.getElementById("filter-sheet-village");
        if (villageFilterSelect) {
            villageFilterSelect.innerHTML = `<option value="all">Tất cả thôn/khu vực (25 thôn)</option>` +
                villages.map(v => `<option value="${v.name}">${v.name}</option>`).join("");
            villageFilterSelect.value = this.currentFilterVillage;
        }
    }

    // ================= MODAL & CRUD THAO TÁC =================

    openAddSheetModal() {
        document.getElementById("modal-sheet-title").textContent = "Thêm Tờ Bản Đồ Địa Chính";
        document.getElementById("form-sheet").reset();
        document.getElementById("sheet-id").value = "";
        document.getElementById("sheet-progress-slider").value = 0;
        document.getElementById("slider-val-display").innerText = "0%";
        this.openModal("modal-sheet");
    }

    editSheet(id) {
        const sheet = this.data.sheets.find(s => s.id === id);
        if (!sheet) return;

        document.getElementById("modal-sheet-title").textContent = `Chỉnh Sửa ${sheet.code}`;
        document.getElementById("sheet-id").value = sheet.id;
        document.getElementById("sheet-code").value = sheet.code;
        document.getElementById("sheet-village").value = sheet.village;
        document.getElementById("sheet-parcels").value = sheet.parcels;
        document.getElementById("sheet-area").value = sheet.area;
        document.getElementById("sheet-surveyor").value = sheet.surveyor || "Chưa phân công";
        document.getElementById("sheet-cad-editor").value = sheet.cadEditor || "Chưa phân công";
        document.getElementById("sheet-current-stage").value = sheet.stage;
        document.getElementById("sheet-progress-slider").value = sheet.progress;
        document.getElementById("slider-val-display").innerText = sheet.progress + "%";
        document.getElementById("sheet-notes").value = sheet.notes || "";

        this.openModal("modal-sheet");
    }

    handleSaveSheet() {
        const id = document.getElementById("sheet-id").value;
        const code = document.getElementById("sheet-code").value.trim();
        const village = document.getElementById("sheet-village").value.trim();
        const parcels = parseInt(document.getElementById("sheet-parcels").value) || 0;
        const area = parseFloat(document.getElementById("sheet-area").value) || 0;
        const surveyor = document.getElementById("sheet-surveyor").value;
        const cadEditor = document.getElementById("sheet-cad-editor").value;
        const stage = parseInt(document.getElementById("sheet-current-stage").value);
        const progress = parseInt(document.getElementById("sheet-progress-slider").value) || 0;
        const notes = document.getElementById("sheet-notes").value.trim();

        if (!code || !village) {
            this.showToast("Vui lòng nhập đầy đủ số tờ và địa bàn!", "warning");
            return;
        }

        if (id) {
            // Cập nhật (Sửa thông tin hoặc Nộp sản phẩm)
            const index = this.data.sheets.findIndex(s => s.id === id);
            if (index !== -1) {
                this.data.sheets[index] = { ...this.data.sheets[index], code, village, parcels, area, surveyor, cadEditor, stage, progress, notes };
                const stageObj = STAGES.find(st => st.id === Number(stage)) || STAGES[0];
                const actionType = this.currentUserRole === "admin" ? "UPDATE" : "SUBMIT";
                const actionDesc = this.currentUserRole === "admin"
                    ? `Giám Đốc đã cập nhật Tờ ${code} (${village}) - Giai đoạn: ${stageObj.name}, Tiến độ: ${progress}%`
                    : `Nhân viên ${this.currentUserName} đã NỘP SẢN PHẨM / cập nhật Tờ ${code} (${village}) - Giai đoạn: ${stageObj.name}, Tiến độ: ${progress}%`;
                
                this.recordAudit(actionType, code, actionDesc);
                this.showToast(`Đã lưu & nộp sản phẩm ${code} thành công!`, "success");
            }
        } else {
            // Tạo mới (chỉ Admin)
            if (this.currentUserRole !== "admin") {
                this.showToast("Quyền hạn bị từ chối: Chỉ Giám Đốc mới có quyền tạo mới tờ bản đồ!", "error");
                return;
            }
            const newSheet = {
                id: "sh-" + Date.now(),
                code, village, parcels, area, surveyor, cadEditor, stage, progress, notes
            };
            this.data.sheets.push(newSheet);
            this.recordAudit("UPDATE", code, `Giám Đốc đã thêm mới tờ bản đồ ${code} (${village})`);
            this.showToast(`Đã thêm mới ${code} vào dự án!`, "success");
        }

        this.saveData();
        this.closeModal("modal-sheet");
        this.renderAll();
    }

    deleteSheet(id) {
        if (this.currentUserRole !== "admin") {
            this.showToast("Quyền hạn bị từ chối: Chỉ Giám Đốc mới có quyền xóa tờ bản đồ!", "error");
            return;
        }
        const sheet = this.data.sheets.find(s => s.id === id);
        if (!sheet) return;
        if (confirm(`Bạn có chắc muốn xóa ${sheet.code}? Toàn bộ dữ liệu của tờ này sẽ bị lưu lại dấu vết xóa.`)) {
            // Lưu dấu vết xóa có thể khôi phục
            this.recordAudit("DELETE", sheet.code, `Giám Đốc đã xóa tờ bản đồ ${sheet.code} thuộc ${sheet.village} (${sheet.parcels} thửa, ${sheet.area}ha, tiến độ ${sheet.progress}%)`, sheet);
            this.data.sheets = this.data.sheets.filter(s => s.id !== id);
            this.saveData();
            this.renderAll();
            this.showToast(`Đã xóa ${sheet.code} và lưu lại dấu vết vào sổ hệ thống!`, "info");
        }
    }

    // CRUD VƯỚNG MẮC THỰC ĐỊA
    openAddIssueModal() {
        document.getElementById("modal-issue-title").textContent = "Ghi Nhận Vướng Mắc Hiện Trường";
        document.getElementById("form-issue").reset();
        document.getElementById("issue-id").value = "";
        this.openModal("modal-issue");
    }

    editIssue(id) {
        const issue = this.data.issues.find(i => i.id === id);
        if (!issue) return;

        document.getElementById("modal-issue-title").textContent = "Cập Nhật Vướng Mắc Thực Địa";
        document.getElementById("issue-id").value = issue.id;
        document.getElementById("issue-sheet-id").value = issue.sheetId;
        document.getElementById("issue-parcel").value = issue.parcel;
        document.getElementById("issue-owner").value = issue.owner || "";
        document.getElementById("issue-type").value = issue.type;
        document.getElementById("issue-desc").value = issue.desc;
        document.getElementById("issue-solution").value = issue.solution || "";
        document.getElementById("issue-status").value = issue.status;

        this.openModal("modal-issue");
    }

    handleSaveIssue() {
        const id = document.getElementById("issue-id").value;
        const sheetId = document.getElementById("issue-sheet-id").value;
        const parcel = document.getElementById("issue-parcel").value.trim();
        const owner = document.getElementById("issue-owner").value.trim();
        const type = document.getElementById("issue-type").value;
        const desc = document.getElementById("issue-desc").value.trim();
        const solution = document.getElementById("issue-solution").value.trim();
        const status = document.getElementById("issue-status").value;

        if (!parcel || !desc) {
            this.showToast("Vui lòng điền số thửa và nội dung mô tả!", "warning");
            return;
        }

        const todayStr = new Date().toISOString().split("T")[0];

        if (id) {
            const index = this.data.issues.findIndex(i => i.id === id);
            if (index !== -1) {
                this.data.issues[index] = { ...this.data.issues[index], sheetId, parcel, owner, type, desc, solution, status };
                this.showToast("Đã cập nhật tình trạng vướng mắc!", "success");
            }
        } else {
            const newIssue = {
                id: "iss-" + Date.now(),
                sheetId, parcel, owner, type, desc, solution, status,
                date: todayStr
            };
            this.data.issues.unshift(newIssue);
            this.showToast("Đã thêm vướng mắc vào danh bạ theo dõi!", "success");
        }

        this.saveData();
        this.closeModal("modal-issue");
        this.renderAll();
    }

    deleteIssue(id) {
        const issue = this.data.issues.find(i => i.id === id);
        if (!issue) return;
        if (confirm("Bạn có chắc muốn xóa vụ việc vướng mắc này? Thao tác này sẽ lưu lại dấu vết.")) {
            this.recordAudit("DELETE", "Vướng mắc " + issue.village, `${this.currentUserName} đã xóa vướng mắc hộ: "${issue.owner}" - Nội dung: "${issue.content}"`, issue);
            this.data.issues = this.data.issues.filter(i => i.id !== id);
            this.saveData();
            this.renderAll();
            this.showToast(`Đã xóa vướng mắc và lưu lại dấu vết của ${this.currentUserName}!`, "info");
        }
    }

    // CRUD NHẬT TRÌNH THI CÔNG
    openAddLogModal() {
        document.getElementById("form-log").reset();
        document.getElementById("log-date").value = new Date().toISOString().split("T")[0];
        this.openModal("modal-log");
    }

    handleSaveLog() {
        const date = document.getElementById("log-date").value;
        const weather = document.getElementById("log-weather").value;
        const crew = document.getElementById("log-crew").value.trim();
        const parcelsDone = parseInt(document.getElementById("log-parcels-done").value) || 0;
        const content = document.getElementById("log-content").value.trim();

        if (!date || !content) {
            this.showToast("Vui lòng điền ngày và nội dung thi công!", "warning");
            return;
        }

        const newLog = {
            id: "log-" + Date.now(),
            date, weather, crew, parcelsDone, content
        };

        this.data.logs.unshift(newLog);
        this.recordAudit("SUBMIT", "Nhật ký " + date, `${this.currentUserName} đã ghi nhật trình thi công: ${parcelsDone} thửa - ${content.substring(0, 40)}...`);
        this.saveData();
        this.closeModal("modal-log");
        this.renderAll();
        this.showToast("Đã ghi nhật trình thi công hôm nay!", "success");
    }

    // CRUD THÀNH VIÊN
    openAddMemberModal() {
        if (this.currentUserRole !== "admin") {
            this.showToast("Chỉ Giám Đốc mới có quyền thêm nhân sự!", "error");
            return;
        }
        document.getElementById("form-member").reset();
        document.getElementById("member-id").value = "";
        this.openModal("modal-member");
    }

    handleSaveMember() {
        if (this.currentUserRole !== "admin") {
            this.showToast("Chỉ Giám Đốc mới có quyền thêm nhân sự!", "error");
            return;
        }
        const name = document.getElementById("member-name").value.trim();
        const role = document.getElementById("member-role").value;
        const phone = document.getElementById("member-phone").value.trim();
        const device = document.getElementById("member-device").value.trim();

        if (!name) {
            this.showToast("Vui lòng nhập tên cán bộ!", "warning");
            return;
        }

        const newMember = {
            id: "mem-" + Date.now(),
            name, role, phone, device
        };

        this.data.members.push(newMember);
        this.recordAudit("UPDATE", "Nhân sự " + name, `Giám Đốc đã thêm cán bộ: ${name} (${role})`);
        this.saveData();
        this.closeModal("modal-member");
        this.renderAll();
        this.showToast(`Đã thêm cán bộ ${name} vào tổ đo!`, "success");
    }

    deleteMember(id) {
        if (this.currentUserRole !== "admin") {
            this.showToast("Quyền hạn bị từ chối: Chỉ Giám Đốc mới có quyền xóa nhân sự kỹ thuật!", "error");
            return;
        }
        const member = this.data.members.find(m => m.id === id);
        if (!member) return;
        if (confirm(`Bạn có chắc muốn xóa cán bộ ${member.name} khỏi danh sách tổ?`)) {
            this.recordAudit("DELETE", "Nhân sự " + member.name, `Giám Đốc đã xóa cán bộ: ${member.name} (${member.role})`, member);
            this.data.members = this.data.members.filter(m => m.id !== id);
            this.saveData();
            this.renderAll();
            this.showToast(`Đã gỡ cán bộ ${member.name} và lưu lại dấu vết!`, "info");
        }
    }

    // CẤU HÌNH DỰ ÁN
    openProjectModal() {
        if (this.currentUserRole !== "admin") {
            this.showToast("Quyền hạn bị từ chối: Chỉ Giám Đốc Nguyễn Trọng Đợi mới có quyền thay đổi thông tin dự án!", "error");
            return;
        }
        const p = this.data.project;
        document.getElementById("proj-name").value = p.name || "";
        document.getElementById("proj-province").value = p.province || "";
        document.getElementById("proj-district").value = p.district || "";
        document.getElementById("proj-ward").value = p.ward || "";
        document.getElementById("proj-crs").value = p.crs || "";
        document.getElementById("proj-start").value = p.startDate || "";
        document.getElementById("proj-deadline").value = p.deadline || "";
        document.getElementById("proj-team").value = p.teamName || "";
        const passInput = document.getElementById("proj-security-password");
        if (passInput) {
            passInput.value = p.password || "DoiLandTeam";
        }
        const staffPassInput = document.getElementById("proj-staff-password");
        if (staffPassInput) {
            staffPassInput.value = p.staffPassword || "123456";
        }

        this.openModal("modal-project");
    }

    handleSaveProject() {
        if (this.currentUserRole !== "admin") {
            this.showToast("Chỉ Giám Đốc mới có quyền lưu cấu hình dự án!", "error");
            return;
        }
        const passInput = document.getElementById("proj-security-password");
        const staffPassInput = document.getElementById("proj-staff-password");
        const newPassword = passInput && passInput.value.trim() ? passInput.value.trim() : (this.data.project.password || "DoiLandTeam");
        const newStaffPassword = staffPassInput && staffPassInput.value.trim() ? staffPassInput.value.trim() : (this.data.project.staffPassword || "123456");

        this.data.project = {
            id: this.data.project.id || "proj-001",
            name: document.getElementById("proj-name").value.trim(),
            province: document.getElementById("proj-province").value.trim(),
            district: document.getElementById("proj-district").value.trim(),
            ward: document.getElementById("proj-ward").value.trim(),
            crs: document.getElementById("proj-crs").value.trim(),
            startDate: document.getElementById("proj-start").value,
            deadline: document.getElementById("proj-deadline").value,
            teamName: document.getElementById("proj-team").value.trim(),
            password: newPassword,
            staffPassword: newStaffPassword
        };

        this.recordAudit("UPDATE", "Cấu hình dự án", "Giám Đốc đã cập nhật thông tin dự án & mật khẩu bảo mật mới");
        this.saveData();
        this.closeModal("modal-project");
        this.renderAll();
        this.showToast("Đã lưu thông tin dự án & mật khẩu bảo mật mới!", "success");
    }

    // ================= SỔ DẤU VẾT HỆ THỐNG (AUDIT TRAIL) =================

    // Render Bảng Sổ Dấu Vết Hệ Thống
    renderAuditTable() {
        const tbody = document.getElementById("audit-table-body");
        const badgeAudit = document.getElementById("badge-audit-logs");
        if (!this.data.auditLogs) this.data.auditLogs = [];

        if (badgeAudit) {
            badgeAudit.textContent = this.data.auditLogs.length;
        }

        if (!tbody) return;

        let logs = this.data.auditLogs;

        if (this.currentAuditFilterAction !== "all") {
            logs = logs.filter(l => l.action === this.currentAuditFilterAction);
        }

        if (this.auditSearchText) {
            logs = logs.filter(l => 
                (l.user && l.user.toLowerCase().includes(this.auditSearchText)) ||
                (l.target && l.target.toLowerCase().includes(this.auditSearchText)) ||
                (l.details && l.details.toLowerCase().includes(this.auditSearchText))
            );
        }

        if (logs.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted" style="padding: 30px;">Không có dữ liệu dấu vết nào phù hợp bộ lọc.</td></tr>`;
            return;
        }

        const actionPillMap = {
            "DELETE": `<span class="action-pill action-delete"><svg style="width:12px;height:12px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg> Xóa Dữ Liệu</span>`,
            "SUBMIT": `<span class="action-pill action-submit"><svg style="width:12px;height:12px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Nộp Sản Phẩm</span>`,
            "UPDATE": `<span class="action-pill action-update"><svg style="width:12px;height:12px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Cập Nhật</span>`,
            "LOGIN": `<span class="action-pill action-login"><svg style="width:12px;height:12px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> Đăng Nhập</span>`,
            "RESTORE": `<span class="action-pill action-restore">Khôi Phục</span>`,
            "INIT": `<span class="action-pill action-login">Khởi Tạo</span>`,
            "SYSTEM": `<span class="action-pill action-update">Hệ Thống</span>`
        };

        tbody.innerHTML = logs.map(log => {
            const pill = actionPillMap[log.action] || `<span class="action-pill">${log.action}</span>`;
            const hasRestore = log.deletedData && this.currentUserRole === "admin";
            const restoreBtn = hasRestore
                ? `<button class="btn btn-outline" style="padding: 4px 8px; font-size: 11px;" onclick="app.restoreAudit('${log.id}')" title="Khôi phục lại dữ liệu đã xóa">Khôi phục</button>`
                : `<span class="text-muted" style="font-size: 11px;">-</span>`;

            const userIcon = log.role === "admin" ? "🛡️ " : "👷 ";

            return `
                <tr>
                    <td style="font-size: 12px; color: var(--text-muted); font-family: monospace;">${log.timestamp}</td>
                    <td><strong>${userIcon}${log.user}</strong></td>
                    <td>${pill}</td>
                    <td><span style="font-weight: 600; color: #1e293b;">${log.target}</span></td>
                    <td style="font-size: 13px; color: #334155;">${log.details}</td>
                    <td style="text-align: center;">${restoreBtn}</td>
                </tr>
            `;
        }).join("");
    }

    // Khôi phục dữ liệu đã xóa từ Sổ Dấu Vết (Chỉ Giám Đốc)
    restoreAudit(auditId) {
        if (this.currentUserRole !== "admin") {
            this.showToast("Chỉ Giám Đốc mới có quyền khôi phục dữ liệu đã xóa!", "error");
            return;
        }
        const log = this.data.auditLogs.find(l => l.id === auditId);
        if (!log || !log.deletedData) {
            this.showToast("Bản ghi này không có dữ liệu để khôi phục!", "warning");
            return;
        }
        const item = log.deletedData;
        if (item.code && item.village) {
            // Tờ bản đồ
            this.data.sheets.push(item);
            this.showToast(`Đã khôi phục tờ ${item.code} thành công!`, "success");
        } else if (item.owner) {
            // Vướng mắc
            this.data.issues.push(item);
            this.showToast(`Đã khôi phục vướng mắc hộ ${item.owner}!`, "success");
        } else if (item.role && item.phone) {
            // Thành viên
            this.data.members.push(item);
            this.showToast(`Đã khôi phục cán bộ ${item.name}!`, "success");
        }
        this.recordAudit("RESTORE", log.target, `Giám Đốc đã khôi phục lại dữ liệu đã xóa từ mục "${log.target}"`);
        log.deletedData = null; // Đã khôi phục xong
        this.saveData();
        this.renderAll();
    }

    // Xuất Sổ Dấu Vết Hệ Thống ra file Excel
    exportAuditExcel() {
        const now = new Date();
        const dateStr = `${now.getDate()}_${now.getMonth() + 1}_${now.getFullYear()}`;
        const p = this.data.project;

        let rowsHtml = (this.data.auditLogs || []).map((l, idx) => `
            <tr>
                <td style="text-align: center;">${idx + 1}</td>
                <td style="font-family: monospace;">${l.timestamp}</td>
                <td>${l.user} (${l.role === "admin" ? "Giám Đốc" : "Nhân viên"})</td>
                <td style="font-weight: bold; text-align: center;">${l.action}</td>
                <td>${l.target}</td>
                <td>${l.details}</td>
            </tr>
        `).join("");

        let excelContent = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>So_Dau_Vet_He_Thong</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
            <style>
                body { font-family: 'Times New Roman', serif; font-size: 13pt; }
                table { border-collapse: collapse; width: 100%; }
                th { background-color: #059669; color: #ffffff; border: 1px solid #000; padding: 8px; font-weight: bold; }
                td { border: 1px solid #000; padding: 6px 8px; vertical-align: middle; }
                .title { font-size: 16pt; font-weight: bold; text-align: center; color: #047857; }
                .sub { font-size: 12pt; font-style: italic; text-align: center; margin-bottom: 12px; }
            </style>
        </head>
        <body>
            <div class="title">SỔ DẤU VẾT HỆ THỐNG & LỊCH SỬ THAO TÁC (AUDIT TRAIL)</div>
            <div class="sub">Dự án: ${p.name} - ${p.teamName}</div>
            <div class="sub">Hệ tọa độ: ${p.crs} | Ngày xuất: ${now.toLocaleDateString("vi-VN")}</div>
            <br/>
            <table>
                <thead>
                    <tr>
                        <th style="width: 50px;">STT</th>
                        <th style="width: 150px;">Thời Gian</th>
                        <th style="width: 180px;">Người Thực Hiện</th>
                        <th style="width: 120px;">Hành Động</th>
                        <th style="width: 160px;">Đối Tượng</th>
                        <th>Chi Tiết Dữ Liệu & Thao Tác</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml}
                </tbody>
            </table>
        </body>
        </html>`;

        const blob = new Blob([excelContent], { type: "application/vnd.ms-excel;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `SO_DAU_VET_THAO_TAC_${p.ward.replace(/\s+/g, "_")}_${dateStr}.xls`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        this.showToast("Đã xuất Sổ Dấu Vết Hệ Thống ra file Excel thành công!", "success");
    }

    // ================= XUẤT EXCEL & SAO LƯU =================

    // Xuất báo cáo tiến độ ra file Excel chuyên nghiệp (Chuẩn UTF-8 mở được ngay trên Excel không bị lỗi font)
    exportExcel() {
        const p = this.data.project;
        const now = new Date();
        const dateStr = `${now.getDate()}_${now.getMonth() + 1}_${now.getFullYear()}`;

        // Tạo nội dung HTML bảng tính dạng XML/Excel tương thích cao
        let excelContent = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Tien_Do_Dia_Chinh</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
            <style>
                body { font-family: 'Times New Roman', serif; font-size: 13pt; }
                table { border-collapse: collapse; width: 100%; }
                th { background-color: #059669; color: #ffffff; font-weight: bold; border: 1px solid #000; padding: 6px; text-align: center; }
                td { border: 1px solid #000; padding: 5px; }
                .title { font-size: 16pt; font-weight: bold; text-align: center; margin-bottom: 5px; }
                .sub-title { font-size: 12pt; text-align: center; margin-bottom: 15px; }
            </style>
        </head>
        <body>
            <div class="title">BÁO CÁO TIẾN ĐỘ THI CÔNG ĐO ĐẠC BẢN ĐỒ ĐỊA CHÍNH</div>
            <div class="sub-title">Công trình: ${p.name}<br/>Địa bàn: ${p.ward} - ${p.district} - ${p.province} | Hệ tọa độ: ${p.crs}</div>
            
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Số Hiệu Tờ</th>
                        <th>Thôn / Khu Vực</th>
                        <th>Số Thửa</th>
                        <th>Diện Tích (ha)</th>
                        <th>Giai Đoạn Thi Công</th>
                        <th>Tiến Độ (%)</th>
                        <th>CB Ngoại Nghiệp</th>
                        <th>CB Nội Nghiệp</th>
                        <th>Vướng Mắc Thực Địa</th>
                        <th>Ghi Chú Kỹ Thuật</th>
                    </tr>
                </thead>
                <tbody>
        `;

        this.data.sheets.forEach((s, idx) => {
            const stage = STAGES.find(st => st.id === Number(s.stage)) || STAGES[0];
            const sheetIssues = this.data.issues.filter(i => i.sheetId === s.id);
            const issueText = sheetIssues.map(i => `${i.parcel}: ${i.desc} (${i.status === "resolved" ? "Đã xong" : "Đang vướng"})`).join("; ") || "Không";

            excelContent += `
                <tr>
                    <td style="text-align: center;">${idx + 1}</td>
                    <td style="text-align: center; font-weight: bold;">${s.code}</td>
                    <td>${s.village}</td>
                    <td style="text-align: right;">${s.parcels}</td>
                    <td style="text-align: right;">${s.area}</td>
                    <td style="text-align: center;">${stage.name}</td>
                    <td style="text-align: center;">${s.progress}%</td>
                    <td>${s.surveyor || ""}</td>
                    <td>${s.cadEditor || ""}</td>
                    <td>${issueText}</td>
                    <td>${s.notes || ""}</td>
                </tr>
            `;
        });

        excelContent += `
                </tbody>
            </table>
            <br/><br/>
            <div class="title" style="font-size: 14pt; color: #0284c7; text-align: center;">DANH BẠ 25 THÔN & BÍ THƯ - TRƯỞNG THÔN XÃ KON PLÔNG</div>
            <table>
                <thead>
                    <tr>
                        <th style="background-color: #0284c7; color: #ffffff;">STT</th>
                        <th style="background-color: #0284c7; color: #ffffff;">Tên Thôn</th>
                        <th style="background-color: #0284c7; color: #ffffff;">Bí Thư Chi Bộ</th>
                        <th style="background-color: #0284c7; color: #ffffff;">SĐT Bí Thư</th>
                        <th style="background-color: #0284c7; color: #ffffff;">Trưởng Thôn</th>
                        <th style="background-color: #0284c7; color: #ffffff;">SĐT Trưởng Thôn</th>
                        <th style="background-color: #0284c7; color: #ffffff;">Ghi Chú</th>
                    </tr>
                </thead>
                <tbody>
        `;

        const villagesList = this.data.villages || KONPLONG_VILLAGES;
        villagesList.forEach((v) => {
            excelContent += `
                <tr>
                    <td style="text-align: center;">${v.stt}</td>
                    <td style="font-weight: bold;">${v.name}</td>
                    <td>${v.secName || ""}</td>
                    <td style="mso-number-format:'\\@';">${v.secPhone || ""}</td>
                    <td>${v.leaderName || (v.note ? v.secName : "")}</td>
                    <td style="mso-number-format:'\\@';">${v.leaderPhone || ""}</td>
                    <td>${v.note || ""}</td>
                </tr>
            `;
        });

        excelContent += `
                </tbody>
            </table>
            <br/><br/>
            <div class="title" style="font-size: 14pt; color: #059669; text-align: center;">DANH SÁCH NHÂN SỰ KỸ THUẬT - CTY MÔI TRƯỜNG PHƯỚC THỊNH</div>
            <table>
                <thead>
                    <tr>
                        <th style="background-color: #059669; color: #ffffff;">STT</th>
                        <th style="background-color: #059669; color: #ffffff;">Họ và Tên</th>
                        <th style="background-color: #059669; color: #ffffff;">Chức Danh / Vị Trí</th>
                        <th style="background-color: #059669; color: #ffffff;">Số Điện Thoại</th>
                        <th style="background-color: #059669; color: #ffffff;">Nhiệm Vụ / Thiết Bị</th>
                    </tr>
                </thead>
                <tbody>
        `;

        this.data.members.forEach((m, idx) => {
            excelContent += `
                <tr>
                    <td style="text-align: center;">${idx + 1}</td>
                    <td style="font-weight: bold;">${m.name}</td>
                    <td>${m.role}</td>
                    <td style="mso-number-format:'\\@';">${m.phone || ""}</td>
                    <td>${m.device || ""}</td>
                </tr>
            `;
        });

        excelContent += `
                </tbody>
            </table>
            <br/>
            <table style="border: none;">
                <tr style="border: none;">
                    <td style="border: none; width: 50%; text-align: center;">
                        <br/>
                        <strong>TỔ TRƯỞNG KỸ THUẬT NGOẠI NGHIỆP</strong><br/><br/><br/><br/>
                        Nguyễn Xuân Huy
                    </td>
                    <td style="border: none; width: 50%; text-align: center; font-style: italic;">
                        Kon Plông, Ngày .... tháng .... năm 2026<br/>
                        <strong>GIÁM ĐỐC ĐIỀU HÀNH</strong><br/><br/><br/><br/>
                        <strong>Nguyễn Trọng Đợi</strong><br/>
                        <span style="font-size: 10pt;">(SĐT: 0979.103.937 - ${p.teamName})</span>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        `;

        const blob = new Blob([excelContent], { type: "application/vnd.ms-excel;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Bao_Cao_Tien_Do_Dia_Chinh_${dateStr}.xls`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showToast("Đã xuất báo cáo Excel thành công!", "success");
    }

    // Tải file JSON sao lưu dự phòng
    exportJSONBackup() {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.data, null, 2));
        const a = document.createElement("a");
        a.href = dataStr;
        const now = new Date();
        const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
        a.download = `DuAn_DiaChinh_Backup_${dateStr}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        this.showToast("Đã tải file sao lưu dữ liệu (.json) về máy!", "success");
    }

    // Phục hồi dữ liệu từ file JSON
    handleRestoreJSON(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const parsed = JSON.parse(e.target.result);
                if (parsed.sheets && parsed.project) {
                    this.data = parsed;
                    this.saveData();
                    this.renderAll();
                    this.showToast("Đã khôi phục toàn bộ dữ liệu dự án thành công!", "success");
                } else {
                    this.showToast("Tệp không đúng định dạng sao lưu CADA-TRACK!", "error");
                }
            } catch (err) {
                this.showToast("Lỗi giải mã file JSON!", "error");
            }
        };
        reader.readAsText(file);
        event.target.value = "";
    }

    // Hiển thị thông báo Toast mượt mà
    showToast(message, type = "info") {
        const container = document.getElementById("toast-container");
        if (!container) return;

        const toast = document.createElement("div");
        toast.className = `toast ${type}`;
        
        let icon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 18px; height: 18px;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
        if (type === "success") {
            icon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 18px; height: 18px; color: #10b981;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
        } else if (type === "error") {
            icon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 18px; height: 18px; color: #ef4444;"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
        }

        toast.innerHTML = `${icon}<span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateX(20px)";
            toast.style.transition = "all 0.3s ease";
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    // Modal Helpers
    openModal(id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.add("active");
    }

    closeModal(id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.remove("active");
    }
}

// Hàm toàn cục cho HTML gọi
function switchTab(tabId) {
    if (window.app) window.app.switchTab(tabId);
}
function closeModal(modalId) {
    if (window.app) window.app.closeModal(modalId);
}
function lockApp() {
    if (window.app) window.app.lockApp();
}
function openAddSheetModal() {
    if (window.app) window.app.openAddSheetModal();
}
function openAddIssueModal() {
    if (window.app) window.app.openAddIssueModal();
}
function openAddLogModal() {
    if (window.app) window.app.openAddLogModal();
}
function openAddMemberModal() {
    if (window.app) window.app.openAddMemberModal();
}

// Khởi chạy khi tài liệu sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
    window.app = new CadaTrackApp();
});
