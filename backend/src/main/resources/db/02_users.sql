-- Buoc 2: bang users (theo tai lieu thiet ke auth; role dung bo CUSTOMER/SELLER/ADMIN theo dac ta do an).
-- Entity tuong ung: com.nhom5.backend.entity.User. Thay doi cot -> sua ca entity va bao nhom.
USE nongsan_db;
GO

IF OBJECT_ID(N'dbo.users', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.users (
        id            BIGINT IDENTITY(1,1) NOT NULL,
        full_name     NVARCHAR(100)  NOT NULL,
        email         NVARCHAR(150)  NOT NULL,
        password_hash NVARCHAR(255)  NULL,                       -- NULL neu chi dang nhap Google
        provider      VARCHAR(20)    NOT NULL CONSTRAINT df_users_provider  DEFAULT 'LOCAL',
        provider_id   VARCHAR(255)   NULL,                       -- Google "sub"
        role          VARCHAR(20)    NOT NULL CONSTRAINT df_users_role      DEFAULT 'CUSTOMER',
        avatar_url    NVARCHAR(255)  NULL,
        is_active     BIT            NOT NULL CONSTRAINT df_users_is_active DEFAULT 1,
        created_at    DATETIME2      NOT NULL CONSTRAINT df_users_created   DEFAULT SYSDATETIME(),
        updated_at    DATETIME2      NULL,
        CONSTRAINT pk_users PRIMARY KEY (id),
        CONSTRAINT uk_users_email UNIQUE (email),
        CONSTRAINT ck_users_provider CHECK (provider IN ('LOCAL', 'GOOGLE')),
        CONSTRAINT ck_users_role CHECK (role IN ('CUSTOMER', 'SELLER', 'ADMIN'))
    );
END
GO
