#!/usr/bin/env python3
"ci comment"

import datetime as dt
import os

import fire
import jwt
import requests

__dirname__ = os.path.abspath(os.path.join(__file__, '..'))


def create_app_token(private_key: str, iss: int) -> str:
    """Create github app jwt

    Args:
        private_key (str): rsa private key

    Returns:
        bytes: jwt
    """
    now = int(dt.datetime.now().timestamp())

    return jwt.encode({
        "iat": now,
        "exp": now + 10 * 60,
        "iss": iss
    }, private_key, algorithm='RS256').decode('utf-8')


def read_private_key(filename: str) -> str:
    """Read private key from file

    Args:
        filename (str, optional): File path relative to this file.

    Returns:
        str: file content
    """
    with open(os.path.abspath(os.path.join(__dirname__, filename))) as f:
        return f.read()


def _app_endpoint_headers(app_token: str) -> dict:
    return {
        "Authorization": f'Bearer {app_token}',
        "Accept": "application/vnd.github.machine-man-preview+json"
    }


def _installation_endpoint_headers(installation_token: str) -> dict:
    return {
        "Authorization": f'token {installation_token}',
        "Accept": "application/vnd.github.machine-man-preview+json"
    }


def get_app(app_token: str) -> dict:
    "https://developer.github.com/v3/apps/#get-the-authenticated-github-app"

    return requests.get(
        'https://api.github.com/app',
        headers=_app_endpoint_headers(app_token)).json()


def create_installation_token(app_token: str, installation_id: int) -> dict:
    "https://developer.github.com/v3/apps/#create-a-new-installation-token"

    return requests.post(
        f'https://api.github.com/app/installations/{installation_id}/access_tokens',
        headers=_app_endpoint_headers(app_token)).json()


def get_repo_installation(
        app_token: str,
        owner: str = 'NateScarlet',
        repo: str = 'auto-dragalia') -> dict:
    "https://developer.github.com/v3/apps/#get-a-repository-installation"

    return requests.get(
        f'https://api.github.com/repos/{owner}/{repo}/installation',
        headers=_app_endpoint_headers(app_token)).json()


def get_user_installation(app_token: str, username: str = 'NateScarlet') -> dict:
    "https://developer.github.com/v3/apps/#get-a-user-installation"

    return requests.get(
        f'https://api.github.com/users/{username}/installation',
        headers=_app_endpoint_headers(app_token)).json()


def create_comment(
        installation_token: str,
        owner: str,
        repo: str,
        commit_sha: str,
        body: str) -> dict:
    "https://developer.github.com/v3/repos/comments/#create-a-commit-comment"

    return requests.post(
        f'https://api.github.com/repos/{owner}/{repo}/commits/{commit_sha}/comments',
        json={"body": body},
        headers=_installation_endpoint_headers(installation_token)
    ).json()


def ci_comment() -> dict:
    """Add comment for ci environment.  """

    private_key = read_private_key(
        'auto-dragalia-bot.2019-10-18.private-key.pem')
    app_token = create_app_token(private_key, 42355)
    installation_token = create_installation_token(app_token, 2278043)

    commit_sha1 = os.environ['CIRCLE_SHA1']
    filename = f"auto-dragalia-${os.getenv('CIRCLE_TAG') or commit_sha1[:8]}.zip"
    body = (f"自动构建 [${filename}](${os.getenv('CIRCLE_BUILD_URL')}"
            f"/artifacts/0{os.getcwd()}/artifacts/{filename})")

    result = create_comment(
        installation_token,
        owner=os.getenv(
            "CIRCLE_PROJECT_USERNAME", "NateScarlet"),
        repo=os.getenv(
            "CIRCLE_PROJECT_REPONAME", "auto-dragalia"),
        commit_sha=os.environ['CIRCLE_SHA1'],
        body=body)
    print(result)
    return result


if __name__ == '__main__':
    fire.Fire(ci_comment)
