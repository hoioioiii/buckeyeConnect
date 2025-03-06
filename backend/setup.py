# Purpose: This file is used to install the required packages for the backend.
# Team: Team Undecided
from setuptools import setup

setup(
   name='buckeyeConnect',
   version='1.0',
   description='Activity Website',
   author='Team Undecided',
   package_dir={"": "src"},
   install_requires=[#external packages as dependencies
        "psycopg2-binary",
        "sqlalchemy",
        "alembic",
        "elasticsearch",
        "elasticsearch-dsl",
        "python-dotenv",
        "pydantic"
    ],
)