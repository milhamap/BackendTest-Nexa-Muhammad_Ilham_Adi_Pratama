CREATE VIEW karyawan_milhamapratama AS
SELECT
    ROW_NUMBER() OVER (ORDER BY nip) AS No,
    nip,
    nama,
    alamat,
    CASE
        WHEN gend = 'L' THEN 'Laki - Laki'
        WHEN gend = 'P' THEN 'Perempuan'
        ELSE 'Tidak Diketahui'
END AS Gend,
    DATE_FORMAT(tgl_lahir, '%d %M %Y') AS Tanggal_Lahir
FROM karyawan;
