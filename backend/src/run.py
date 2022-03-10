"""
Starts the server
"""

# Imports
from os import getenv
from server import server

if __name__ == "__main__":
    server.run(host="127.0.0.1", port="3333", debug=True)
