<p align="center"><a href="https://laraveld.com" target="_blank"><img src="https://minio.nexa.net.id/nexa/nexa_logo_1500.png" width="100%"></a></p>

# Tutorial Github

## Forking dari Repository Utama

1. Buka Halaman [Repo](https://github.com/milhamap/BackendTest-Nexa-Muhammad_Ilham_Adi_Pratama)

2. Tekan Icon Fork

3. Tekan Tombol 'Create Fork'

## Mengcloning Repository Hasil Forking

1. Buka Halaman Github Anda

2. Pilih Repository Hasil Forking

3. Pada Komputer Anda Buka Console / Command Promt

4. Ketikan Perintah Berikut

```
git clone https://github.com/milhamap/BackendTest-Nexa-Muhammad_Ilham_Adi_Pratama.git
```

4. Masuk Ke Dalam Folder Hasil Clone

```
cd nexa-test
```

## Hubungkan dengan repository utama

1. Ketikan perintah berikut pada folder repo hasil forking anda

```
git remote add upstream https://github.com/milhamap/BackendTest-Nexa-Muhammad_Ilham_Adi_Pratama.git
```

2. Ketikan perintah berikut untuk mengupdate data terbaru

```
git fetch upstream
```

3. Untuk mendownload data terbaru dari branch master gunakan perintah berikut

```
git pull upstream main
```

# Tutorial Penggunaan Tanpa Docker

1. Install Node Terlebih Dahulu (Saya menggunakan versi 18.20.5) <br>
   [Download disini](https://nodejs.org/id/download)
2. Install Packagenya Terlebih Dahulu

```
npm install
```

3. Copy isi file .env.example

```
cp .env.example .env
```

4. Jalankan aplikasi

```
npm run start
```

# Tutorial Penggunaan Dengan Docker
1. Install Docker Terlebih Dahulu <br>
   [Download disini](https://www.docker.com/products/docker-desktop/)
2. Copy isi file .env.example

```
cp .env.example .env
```

3. Build Image dari Dockerfile

```
docker build -t node-nexa-test .
```

4. Jalankan aplikasi

```
docker run -p 1000:1000 node-nexa-test
```

# Dokumentasi Postman
Anda dapat melihat dokumentasi postman untuk proyek ini [disini](https://documenter.getpostman.com/view/21604420/2sAYX3qiX5)