import codecs
import os
from setuptools import setup, find_packages
from os import path

here = path.abspath(path.dirname(__file__))

# Get the long description from the README file
try:
    with open(path.join(here, "README.md"), encoding="utf-8") as f:
        long_description = f.read()
except IOError:
    long_description = ""

install_requires = ""
with open("requirements.txt") as fp:
    install_requires += fp.read()


def read(rel_path):
    here = os.path.abspath(os.path.dirname(__file__))
    # intentionally *not* adding an encoding option to open, See:
    #   https://github.com/pypa/virtualenv/issues/201#issuecomment-3145690
    with codecs.open(os.path.join(here, rel_path), "r") as fp:
        return fp.read()


def get_version(rel_path):
    """Get version from file. Copied from pip: https://github.com/pypa/pip/blob/master/setup.py#L19"""
    for line in read(rel_path).splitlines():
        if line.startswith("__version__"):
            # __version__ = "0.9"
            delim = '"' if '"' in line else "'"
            return line.split(delim)[1]
    raise RuntimeError("Unable to find version string.")


setup(
    name="bloock-sdk",
    version=get_version("__init__.py"),
    description="Bloock library for Python",
    long_description=long_description,
    long_description_content_type="text/markdown",
    author="Bloock",
    classifiers=[
        "Development Status :: 4 - Beta",
        "Programming Language :: Python :: 3.6",
        "License :: OSI Approved :: Apache Software License",
    ],
    packages=find_packages(exclude=["tests", "tests.*"]),
    python_requires=">=3.6",
    setup_requires=["cffi>=1.0.0", "wheel"],
    cffi_modules=["bloock/_ffi/build.py:ffi_builder"],
    install_requires=install_requires,
)
