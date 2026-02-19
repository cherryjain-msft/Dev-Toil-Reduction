# GitHub Copilot Skills Demo

This walkthrough demonstrates how to use **Agent Skills** to generate high-quality, consistent code that follows specific instructions, formats or tools.

## What are Skills?

Agent Skills are folders of instructions, scripts, and resources that GitHub Copilot can load when relevant to perform specialized tasks. Skills are an [open standard](https://agentskills.io/) that works across multiple AI agents, including GitHub Copilot in VS Code, GitHub Copilot CLI, and GitHub Copilot coding agent.

**Key benefits of Agent Skills:**

- **Specialize Copilot**: Tailor capabilities for domain-specific tasks without repeating context
- **Reduce repetition**: Create once, use automatically across all conversations
- **Compose capabilities**: Combine multiple skills to build complex workflows
- **Efficient loading**: Only relevant content loads into context when needed
- **Portable**: Works across VS Code, Copilot CLI, and Copilot coding agent

### Agent Skills vs Custom Instructions

| Aspect | Agent Skills | Custom Instructions |
|--------|--------------|---------------------|
| **Purpose** | Teach specialized capabilities and workflows | Define coding standards and guidelines |
| **Portability** | Works across VS Code, Copilot CLI, and Copilot coding agent | VS Code and GitHub.com only |
| **Content** | Instructions, scripts, examples, and resources | Instructions only |
| **Scope** | Task-specific, loaded on-demand | Always applied (or via glob patterns) |
| **Standard** | Open standard ([agentskills.io](https://agentskills.io/)) | VS Code-specific |

**Use Agent Skills when you want to:**
- Create reusable capabilities that work across different AI tools
- Include scripts, examples, or other resources alongside instructions
- Define specialized workflows like API generation, testing, or deployment processes

**Use Custom Instructions when you want to:**
- Define project-specific coding standards
- Set language or framework conventions
- Apply rules based on file types using glob patterns

### Skill Structure

Skills are defined in `.github/skills/` or `.claude/skills/` directories and contain:
- `SKILL.md` - The skill definition with YAML frontmatter (name, description) and detailed instructions
- Additional resources - Scripts, examples, templates, and reference documentation

---

## Demo: Using the `api-endpoint` Skill to Add a New Entity

### Why

- **Consistency**: New developers (or AI assistants) need to have specialized knowledge to produce high quality results. Skills encode institutional knowledge so that code generation is consistent and bespoke.
- **Reduced Review Overhead**: When code generation follows established patterns, reviewers can focus on business logic rather than style/convention fixes.
- **Faster Onboarding**: New team members can use Skills to understand how things are done in your codebase.
- **Scalability**: As codebase grows, Skills ensure consistency, producing higher quality results and making the codebase easier to maintain.

### What to Show

1. **The Skill Definition**: Show the `api-endpoint` skill structure and explain how it encodes a specific technical skill (in this case, creating an API endpoint)
2. **Natural Language Prompt**: Demonstrate using a simple prompt to generate a complete, production-ready API endpoint
3. **Generated Artifacts**: Show all the files Copilot creates (model, repository, routes, migration, seed data, tests)
4. **Pattern Adherence**: Highlight how the generated code follows the exact same patterns as existing code

### How

#### Part 1: Explore the Skill

0. Enable the `chat.useAgentSkills` setting in VSCode to use Agent Skills.
1. Open the [.github/skills/api-endpoint/SKILL.md](../../.github/skills/api-endpoint/SKILL.md) file
2. Walk through the key sections:
   - **Architecture Overview**: Shows the layered architecture (Routes → Repository → Database)
   - **When to Use This Skill**: Trigger conditions for the skill
   - **Workflow Steps**: Step-by-step guide for creating models, repositories, routes, migrations, and seed data
   - **Patterns and Examples**: Concrete code patterns for each component
3. (Optional) Show the [references/database-conventions.md](../../.github/skills/api-endpoint/references/database-conventions.md) file to demonstrate how supporting documentation is included

#### Part 2: Generate the DeliveryVehicle Entity

1. Open Copilot Chat and switch to **Agent** mode
2. Enter the following prompt:

   ```txt
   Add a new API endpoint for a new Entity called 'DeliveryVehicle'. Vehicles belong to branches.
   ```

3. Watch as Copilot:
   - Analyzes the existing codebase structure
   - References the `api-endpoint` skill automatically
   - Generates all required components following the established patterns:
     - **Model**: Generates the model using conventions
     - **Repository**: Generates the Repository with CRUD operations
     - **Routes**: Generates the route with full REST endpoints
     - **Migration**: Creates db migrations
     - **Seed Data**: Creates seed data
     - **Tests**: Creates and runs unit tests for the new endpoint

4. Review the generated code and highlight:
   - **Naming Conventions**: Follows naming conventions for entities/methods
   - **Foreign Key Relationship**: The `branchId` field linking to the `branches` table
   - **API Documentation**: Complete OpenAPI annotations for all endpoints
   - **Error Handling**: Consistent use of custom errors
   - **SQL Utilities**: Using specified utils
   - **Unit Tests**: Created and verified unit tests

#### Part 3: Verify the Implementation

1. Accept the changes
2. Run build/unit tests
3. Open the Swagger UI at `http://localhost:3000/api-docs` and show the new DeliveryVehicle endpoints
4. (Optional) Test the CRUD operations using the Swagger UI

---

## Key Takeaways

| Benefit | Description |
|---------|-------------|
| **Institutional Knowledge** | Skills encode your team's patterns and conventions, making them accessible to all developers and AI assistants |
| **Consistent Code Generation** | Every generated endpoint follows the same structure, reducing code review overhead |
| **Self-Documenting** | Skills serve as living documentation of your project's architecture and patterns |
| **Scalable Development** | As your API grows, Skills ensure consistency across all endpoints |
| **Faster Development** | Developers can generate production-ready code with a simple natural language prompt |

---

## Related Resources

- [Skills in VSCode](https://code.visualstudio.com/docs/copilot/customization/agent-skills)
- [Copilot Custom Instructions](./copilot.md#demo-custom-instructions-and-repository-configuration)
- [Custom Prompt Files](./copilot.md#demo-custom-prompt-files-and-reusable-workflows)
- [API Architecture Documentation](../../docs/architecture.md)
- [SQLite Integration](../../docs/sqlite-integration.md)
