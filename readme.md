<p align="center"><a href="https://laraveld.com" target="_blank"><img src="https://minio.nexa.net.id/nexa/nexa_logo_1500.png" width="100%"></a></p>

# Tutorial Github

## Forking dari Repository Utama

1. Buka Halaman [Repo](https://gitlab.com/milhamap/web-apps-kmipnv)

2. Tekan Icon Fork

## Mengcloning Repository Hasil Forking

1. Buka Halaman Gitlab Anda

2. Pilih Repository Hasil Forking

3. Pada Komputer Anda Buka Console / Command Promt

4. Ketikan Perintah Berikut

```
git clone https://gitlab.com/milhamap/web-apps-kmipnv.git
```

4. Masuk Ke Dalam Folder Hasil Clone

```
cd web-apps-kmipnv
```

## Hubungkan dengan repository utama

1. Ketikan perintah berikut pada folder repo hasil forking anda

```
git remote add upstream https://gitlab.com/milhamap/web-apps-kmipnv.git
```

2. Ketikan perintah berikut untuk mengupdate data terbaru

```
git fetch upstream
```

3. Untuk mendownload data terbaru dari branch master gunakan perintah berikut

```
git pull upstream main
```

# Tutorial Penggunaan & Konfigurasi Laravel

1. Install Composer Terlebih Dahulu <br>
   [Download disini](https://getcomposer.org/download/)
2. Install Packagenya Terlebih Dahulu

```
composer install
```

3. Copy isi file .env.example

```
cp .env.example .env
```

5. Buatlah database kosong di phpmyadmin dengan nama **homestead1**
6. Lakukan Migrasi Database

```
php artisan migrate:refresh --seed
```

7. Jalankan aplikasi

```
php artisan serve
```