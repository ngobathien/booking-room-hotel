---- Tạo database
--CREATE DATABASE HotelBooking;
--GO

--USE HotelBooking;
--GO

-- ==========================================
-- 1️⃣ USERS
-- ==========================================
CREATE TABLE Users (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    FullName NVARCHAR(255) NOT NULL,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    PhoneNumber NVARCHAR(50) NULL,
    Password NVARCHAR(255) NULL,
    Avatar NVARCHAR(MAX) NULL,
    Role NVARCHAR(50) NOT NULL DEFAULT 'USER', -- USER, ADMIN
    Status NVARCHAR(50) NOT NULL DEFAULT 'ACTIVE', -- ACTIVE, INACTIVE, BLOCKED
    RefreshToken NVARCHAR(MAX) NULL,
    IsVerified BIT NOT NULL DEFAULT 0,
    Provider NVARCHAR(50) NOT NULL DEFAULT 'local', -- local, google
    CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),
    UpdatedAt DATETIME2 NOT NULL DEFAULT GETDATE()
);

-- ==========================================
-- 2️⃣ HOTELS
-- ==========================================
CREATE TABLE Hotels (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Name NVARCHAR(255) NOT NULL,
    Phone NVARCHAR(50) NULL,
    Email NVARCHAR(255) NULL,
    Address NVARCHAR(500) NULL,
    Description NVARCHAR(MAX) NULL,
    Policy NVARCHAR(MAX) NULL,
    Images NVARCHAR(MAX) NULL, -- JSON array
    CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),
    UpdatedAt DATETIME2 NOT NULL DEFAULT GETDATE()
);

-- ==========================================
-- 3️⃣ ROOM TYPES
-- ==========================================
CREATE TABLE RoomTypes (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    TypeName NVARCHAR(255) NOT NULL UNIQUE,
    Capacity INT NOT NULL CHECK (Capacity > 0),
    PricePerNight DECIMAL(18,2) NOT NULL CHECK (PricePerNight >= 0),
    CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),
    UpdatedAt DATETIME2 NOT NULL DEFAULT GETDATE()
);

-- ==========================================
-- 4️⃣ ROOMS
-- ==========================================
CREATE TABLE Rooms (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    RoomNumber NVARCHAR(50) NOT NULL UNIQUE,
    Thumbnail NVARCHAR(MAX) NULL,
    Images NVARCHAR(MAX) NULL, -- JSON array
    HotelId UNIQUEIDENTIFIER NOT NULL,
    RoomTypeId UNIQUEIDENTIFIER NOT NULL,
    Status NVARCHAR(50) NOT NULL DEFAULT 'AVAILABLE', -- AVAILABLE, OCCUPIED, MAINTENANCE
    Description NVARCHAR(MAX) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),
    UpdatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),

    CONSTRAINT FK_Room_Hotel FOREIGN KEY (HotelId) REFERENCES Hotels(Id),
    CONSTRAINT FK_Room_RoomType FOREIGN KEY (RoomTypeId) REFERENCES RoomTypes(Id)
);

-- ==========================================
-- 5️⃣ AMENITIES
-- ==========================================
CREATE TABLE Amenities (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Name NVARCHAR(255) NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),
    UpdatedAt DATETIME2 NOT NULL DEFAULT GETDATE()
);

-- ==========================================
-- 6️⃣ ROOM AMENITIES (many-to-many)
-- ==========================================
CREATE TABLE RoomAmenities (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    RoomId UNIQUEIDENTIFIER NOT NULL,
    AmenityId UNIQUEIDENTIFIER NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),
    UpdatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),

    CONSTRAINT FK_RoomAmenities_Room FOREIGN KEY (RoomId) REFERENCES Rooms(Id),
    CONSTRAINT FK_RoomAmenities_Amenity FOREIGN KEY (AmenityId) REFERENCES Amenities(Id),
    CONSTRAINT UQ_RoomAmenity UNIQUE(RoomId, AmenityId)
);

-- ==========================================
-- 7️⃣ BOOKINGS
-- ==========================================
CREATE TABLE Bookings (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    BookingCode NVARCHAR(50) UNIQUE,
    RoomId UNIQUEIDENTIFIER NOT NULL,
    UserId UNIQUEIDENTIFIER NOT NULL,
    FullName NVARCHAR(255) NOT NULL,
    Email NVARCHAR(255) NOT NULL,
    PhoneNumber NVARCHAR(50) NULL,
    SpecialRequest NVARCHAR(MAX) NULL,
    CheckInDate DATETIME2 NOT NULL,
    CheckOutDate DATETIME2 NOT NULL,
    TotalPrice DECIMAL(18,2) NOT NULL,
    BookingStatus NVARCHAR(50) NOT NULL DEFAULT 'PENDING', -- PENDING, CONFIRMED, CANCELLED
    StayStatus NVARCHAR(50) NOT NULL DEFAULT 'NOT_CHECKED_IN', -- NOT_CHECKED_IN, CHECKED_IN, CHECKED_OUT
    ConfirmedAt DATETIME2 NULL,
    CheckedInAt DATETIME2 NULL,
    CheckedOutAt DATETIME2 NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),
    UpdatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),

    CONSTRAINT FK_Booking_Room FOREIGN KEY (RoomId) REFERENCES Rooms(Id),
    CONSTRAINT FK_Booking_User FOREIGN KEY (UserId) REFERENCES Users(Id)
);

-- ==========================================
-- 8️⃣ PAYMENTS
-- ==========================================
CREATE TABLE Payments (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    BookingId UNIQUEIDENTIFIER NOT NULL,
    Amount DECIMAL(18,2) NOT NULL,
    Method NVARCHAR(50) NOT NULL DEFAULT 'VNPAY', -- VNPAY, CREDIT_CARD, ...
    Status NVARCHAR(50) NOT NULL DEFAULT 'PENDING', -- PENDING, SUCCESS, FAILED
    PaymentUrl NVARCHAR(MAX) NULL,
    TransactionId NVARCHAR(MAX) NULL,
    ExpiryAt DATETIME2 NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),
    UpdatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),

    CONSTRAINT FK_Payment_Booking FOREIGN KEY (BookingId) REFERENCES Bookings(Id)
);

-- ==========================================
-- 9️⃣ REVIEWS
-- ==========================================
CREATE TABLE Reviews (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER NOT NULL,
    RoomId UNIQUEIDENTIFIER NOT NULL,
    Rating INT NOT NULL CHECK (Rating BETWEEN 1 AND 5),
    Comment NVARCHAR(1000) NULL,
    IsDeleted BIT NOT NULL DEFAULT 0,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),
    UpdatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),

    CONSTRAINT FK_Review_User FOREIGN KEY (UserId) REFERENCES Users(Id),
    CONSTRAINT FK_Review_Room FOREIGN KEY (RoomId) REFERENCES Rooms(Id)
);

-- ==========================================
-- 🔟 REFRESH TOKENS
-- ==========================================
CREATE TABLE RefreshTokens (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER NOT NULL,
    RefreshToken NVARCHAR(MAX) NOT NULL,
    ExpiresAt DATETIME2 NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),

    CONSTRAINT FK_RefreshToken_User FOREIGN KEY (UserId) REFERENCES Users(Id)
);

-- ==========================================
-- 11️⃣ RESET TOKENS
-- ==========================================
CREATE TABLE ResetTokens (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER NOT NULL,
    ResetPasswordToken NVARCHAR(MAX) NOT NULL,
    ResetPasswordExpires DATETIME2 NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),

    CONSTRAINT FK_ResetToken_User FOREIGN KEY (UserId) REFERENCES Users(Id)
);

-- ==========================================
-- 12️⃣ OTPS
-- ==========================================
CREATE TABLE Otps (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER NULL,
    Email NVARCHAR(255) NOT NULL,
    FullName NVARCHAR(255) NOT NULL,
    Otp NVARCHAR(255) NOT NULL,
    IsUsed BIT NOT NULL DEFAULT 0,
    ExpiresAt DATETIME2 NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),

    CONSTRAINT FK_Otp_User FOREIGN KEY (UserId) REFERENCES Users(Id)
);