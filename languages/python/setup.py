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


setup(
    name="bloock-sdk",
    version="0.1.0",
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
