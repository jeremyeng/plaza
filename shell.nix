{ pkgs ? import <nixpkgs> {} }:

with pkgs;

mkShell {
  buildInputs = [
    stdenv
    libiconv
    libxml2
    libsass
    yarn
    ruby_2_7
    postgresql_13
    redis
    overmind
  ];

  BUNDLE_PATH = "vendor/bundle";
}
