-- CreateTable
CREATE TABLE "series" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "urlToDownload" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "movies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "urlToDownload" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "emulators" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "urlToDownload" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "softwares" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "urlToDownload" TEXT NOT NULL,
    "description" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "series_name_key" ON "series"("name");

-- CreateIndex
CREATE UNIQUE INDEX "movies_name_key" ON "movies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "emulators_name_key" ON "emulators"("name");

-- CreateIndex
CREATE UNIQUE INDEX "softwares_name_key" ON "softwares"("name");
