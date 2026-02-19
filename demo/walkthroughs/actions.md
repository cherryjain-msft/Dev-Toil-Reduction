# GitHub Actions Demos

## Required Workflows

The applied ruleset, [OD OctoCAT Supply Ruleset](https://github.com/organizations/msft-common-demos/settings/rules/8702023) (see [governance.md](./governance.md) for more information), enforces a required workflow: [Dependency Review](https://github.com/msft-common-demos/od-octocat-supply-workflows/blob/main/.github/workflows/dependency-review.yml).

You can showcase how this works in the pull request titled `Feature: Add ToS Download`.

The required workflow lives in the repository https://github.com/msft-common-demos/od-octocat-supply-workflows under https://github.com/msft-common-demos/od-octocat-supply-workflows/blob/main/.github/workflows/dependency-review.yml.

You can demonstrate how required workflows can be used to enforce generalized checks, such as a dependency review. Highlight that the workflow can exist in any other repository or even within another organization of the same enterprise.

## Reusable Workflows

**What to show:** Reusing Actions workflows to streamline common CI/CD tasks across entire organizations or an enterprise.

**Why:** Demonstrate how reusable workflows can help enforce consistency, reduce duplication, and improve maintainability across multiple projects.

**How:**

1. In the demo repository, navigate to the **Actions** tab.
2. Select the [Build and Publish](../../.github/workflows/build-and-publish.yml) workflow from the left sidebar.
3. Review the workflow file to see how it references the reusable workflow from the central repository.
4. Navigate to the central repository to view the workflow: https://github.com/msft-common-demos/od-octocat-supply-workflows/blob/main/.github/workflows/build-publish-containers.yml

## Artifact Attestations

### Creating the Attestation

**What to show:** Artifact Attestations as an integrated feature of GitHub Actions and the `gh` CLI.

**Why:** Improve security and compliance by providing verifiable, tamper-proof build metadata.

**How:**

1. In the demo repository, navigate to the **Actions** tab and select **Attestations**.
  ![Screenshot showing the Actions tab with Attestations menu item highlighted in the left sidebar](./images/attestation-navigation.png)
2. You will find at least four attestations (two each for the frontend and API). Focus on the API attestations and their distinct `predicate-types`:

    ![Screenshot displaying a list of artifact attestations showing different predicate types for frontend and API containers](./images/attestation-types.png)

    1. `https://spdx.dev/Document/v2.3`: Confirms an SBOM is attached. (Note: This does not validate the SBOM's contents).
    2. `https://slsa.dev/provenance/v1`: Verifies the artifact's origin, confirming it was built by a specific reusable workflow and originated from your demo repository.
3. Return to the [Build and Publish](../../.github/workflows/build-and-publish.yml) workflow (accessible via the `Workflow File` link on the attestation page).
4. Point out that this workflow uses a reusable workflow to generate attestations, and navigate to it: https://github.com/msft-common-demos/od-octocat-supply-workflows/blob/main/.github/workflows/build-publish-containers.yml
5. In the reusable workflow, scroll to the bottom to show the simple, built-in actions that generate the attestations.
  ![Screenshot of workflow YAML file showing the steps that generate SBOM and SLSA attestations using GitHub Actions](./images/attestation-workflow-file.png)

### Verifying the Attestation

> [!NOTE]
> The [`./demo/resources/verify-attestation.sh`](../../demo/resources/verify-attestation.sh) script provided in the demo repo automates the generation of the `gh attestation verify` command for easy demoing. It finds the latest container image and runs the appropriate `gh` command. Ensure you are authenticated with the `gh` CLI (`read:packages` scope); the script will guide you if needed.

**What to show:** Verifying artifact attestations using the `gh` CLI.

**Why:** Demonstrate a simple method to confirm an artifact's integrity before deployment.

**How:**

1. In a local checkout or Codespace, open a terminal.
2. Run the verification script:

    ```bash
    ./demo/resources/verify-attestation.sh
    ```

3. The output will show:
  ![Terminal output showing successful verification of artifact attestations with SLSA provenance and SBOM checks](./images/attestation-cli-output.png)
    1. The raw output from the `gh attestation verify` command.
    2. A summary explaining the verification results.

4. (Optional) If Azure deployments are configured, show how verification can be enforced in a GitHub Action:
    1. Open the deployment workflow: [.github/workflows/deploy.yml](../../.github/workflows/deploy.yml).
    2. In the `Verify Container Attestations` step, explain that it uses a local custom action.
    3. Navigate to the custom action's source: [.github/actions/verify-container-attestations/action.yml](../../.github/actions/verify-container-attestations/action.yml).
    4. The `GH_COMMAND` environment variable contains the `gh attestation verify` commands for both SLSA and SBOM checks.
    5. This action also generates a helpful job summary, which you can display by navigating to a successful workflow run.

## Virtual Registry, aka Linked Artifacts

**What to show:** Using GitHub's Virtual Registry to associate the production context of artifacts directly with repositories and GHAS alerts.

**Why:** Application security managers are often overwhelmed by a high volume of alerts, many of which may not represent a real risk because the affected code never makes it to production. By associating production context with alerts in GitHub's Virtual Registry, alerts can be prioritized based on actual deployment status, reducing noise and focusing attention on critical issues.

**How:**

> [!IMPORTANT]
> This demo requires you to use the demo option `Requires Azure Deployment` set to `Yes`!

1. After repository creation, wait for the deployment action to complete.
2. Navigate to the [organization's Linked artifacts page](https://github.com/orgs/msft-common-demos/artifacts).

    ![Screenshot showing the Linked Artifacts page in a GitHub organization](./images/linked-artifacts-overview.png)

3. In the linked artifacts, search for the `api` artifact of your repository:

    ```txt
    msft-common-demos/-api
    ```

4. Explain all the different information you see on this screen:
    ![Screenshot showing the details page of Linked Artifacts](./images/linked-artifacts-details.png)
    1. **Source Repository:** This links this metadata record to the actual source repository. In the demo's case, this is automatically done through the provenance attestation created during the build process (see the [Artifact Attestations](#artifact-attestations) section above).
    2. **Attestations:** A list of all associated attestations is also provided at the bottom of the page.
    3. **Storage Record:** This links the artifact itself to this metadata record.
    4. **Deployments:** This is the main piece. Here, metadata about the deployment of the artifact in production can be added, such as the cluster name, risk metadata (like `internet-exposed`), physical location, etc.

5. Go to the `Organization's Security Page` -> `Alerts (Section Header)` -> `Code Scanning`.
6. Apply the two filters `runtime-risk:internet-exposed` and `severity:high` (optionally, if there are too many results in your demo organization, add a filter for the repository name `repo:msft-common-demos/`).
7. You should see the alert `SQL query built from user-controlled sources` in the list. Explain how the previously seen artifact metadata allowed for a better prioritization of this alert, thanks to the `internet-exposed` runtime risk.
    1. (optional): Use this direct link to the filtered view: <https://github.com/orgs/msft-common-demos/security/alerts/code-scanning?query=is%3Aclosed+runtime-risk%3Ainternet-exposed+severity%3Ahigh++repo%3A>
8. Explain how this filter could also be used to create a focused security campaign for all internet-exposed SQL-Injection alerts.

> [!TIP]
> The **sha256-digest** of the artifact is what connects all of these resources, that is the provenance attestation, the storage recrod and the deployment record, together and allows us to show easily navigate through them.

### (optional) Show the creation of the Records in the Deployment Workflow

1. Navigate back to the repository and to the workflow file: [.github/workflows/deploy.yml](../../.github/workflows/deploy.yml).
2. The job `update-virtual-registry` has four steps. Show the two for the API deployment:
    1. **Create API Storage Record**
    2. **Create API Deployment Record**
3. Explain how both steps use a single, simple `gh cli` command to create the records in the Virtual Registry.

> [!TIP]
> External tools like Azure Defender for Cloud or Artifactory create these records automatically already today, but under the hood, they use the same REST API the `gh` CLI calls above are using.
