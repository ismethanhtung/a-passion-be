#!/bin/bash

# Thông tin kết nối từ DATABASE_URL
HOST="centerbeam.proxy.rlwy.net"
PORT="58890"
USER="root"
PASS="tMpNKnrvBSZNqyafBBYTCVPkSHPVtsuD"
DB="railway"

# Tạo thư mục chứa bản sao lưu
BACKUP_DIR="db_backup"
mkdir -p $BACKUP_DIR

# Tên file sao lưu với timestamp
BACKUP_FILE="$BACKUP_DIR/railway_backup_$(date +%Y%m%d_%H%M%S).sql"

# Thực hiện sao lưu
echo "Đang sao lưu cơ sở dữ liệu..."
mysqldump -h $HOST -P $PORT -u $USER -p$PASS $DB > $BACKUP_FILE

# Kiểm tra kết quả
if [ $? -eq 0 ]; then
    echo "Sao lưu thành công: $BACKUP_FILE"
    # Nén file sao lưu
    gzip $BACKUP_FILE
    echo "File sao lưu đã được nén: $BACKUP_FILE.gz"
else
    echo "Sao lưu thất bại!"
fi 