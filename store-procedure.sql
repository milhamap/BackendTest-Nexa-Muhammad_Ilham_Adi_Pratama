delimiter $$

CREATE PROCEDURE sp_add_kary_milhamapratama(
    IN p_nip VARCHAR(20),
    IN p_nama VARCHAR(100),
    IN p_alamat TEXT,
    IN p_gend CHAR(1),
    IN p_tanggal_lahir DATE
)
BEGIN
    DECLARE v_count INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        INSERT INTO log_trx_api(api, request, response, insert_at)
        VALUES ('sp_add_kary_milhamapratama', CONCAT('{"nip":"', p_nip, '"}'), 'Gagal: Terjadi kesalahan sistem', NOW());
    END;

    START TRANSACTION;

    SELECT COUNT(*) INTO v_count FROM karyawan WHERE nip = p_nip;

    IF v_count > 0 THEN
        INSERT INTO log_trx_api(api, request, response, insert_at)
        VALUES ('sp_add_kary_milhamapratama', CONCAT('{"nip":"', p_nip, '"}'), 'Gagal: NIP sudah ada', NOW());
        ROLLBACK;
    ELSE
        INSERT INTO karyawan(nip, nama, alamat, gend, tgl_lahir)
        VALUES (p_nip, p_nama, p_alamat, p_gend, p_tanggal_lahir);

        INSERT INTO log_trx_api(api, request, response, insert_at)
        VALUES ('sp_add_kary_milhamapratama', CONCAT('{"nip":"', p_nip, '"}'), 'Sukses: Data berhasil disimpan', NOW());

        COMMIT;
    END IF;

END$$

delimiter;