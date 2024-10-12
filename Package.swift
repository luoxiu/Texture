// swift-tools-version:5.3

import PackageDescription

let package = Package(
  name: "Texture",
  platforms: [
    .iOS(.v14),
    .macOS(.v11),
    .tvOS(.v14),
  ],
  products: [
    .library(
      name: "AsyncDisplayKit",
      targets: ["AsyncDisplayKit"]
    ),
  ],
  dependencies: [
    .package(url: "https://github.com/pinterest/PINRemoteImage.git", from: "3.0.0"),
  ],
  targets: [
    .target(
      name: "AsyncDisplayKit",
      dependencies: [
        "PINRemoteImage",
      ],
      path: "spm-sources",
      publicHeadersPath: "spm-headers",
      cSettings: [
        .define("AS_USE_VIDEO", to: "1"),
        .define("AS_USE_MAPKIT", to: "1"),
        .define("AS_USE_PHOTOS", to: "1"),
        .define("AS_USE_PHOTOS", to: "1"),
        .define("AS_PIN_REMOTE_IMAGE", to: "1"),
      ],
      linkerSettings: [
        .linkedFramework("AVFoundation"),
        .linkedFramework("CoreMedia"),
        .linkedFramework("MapKit"),
        .linkedFramework("Photos")
      ]
    ),
  ],
  cLanguageStandard: .c11,
  cxxLanguageStandard: .cxx11
)