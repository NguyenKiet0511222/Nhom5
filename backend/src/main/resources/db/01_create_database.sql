-- Buoc 1: tao database. Chay trong SSMS (ket noi toi instance SQL Server cua ban).
IF DB_ID(N'nongsan_db') IS NULL
BEGIN
    CREATE DATABASE nongsan_db;
END
GO
