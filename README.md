# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.
1) It doesn't recognize quoted entries as one entity, and doesn't look for the closing quotation. 
2) It doesn't split the data and create new lines to preserve the format given by the column headers. 
3) It treats each word that comes after a comma as an independent data point. 
4) It doesn't validate the types of entries  
5) It doesn't handle empty spaces

- #### Step 2: Use an LLM to help expand your perspective.
- LLM mentioned issues with handling errors regarding missing columns; may or may not support files with or without headers; may not handle multiline records; type inference only goes so far as in it would handle everything as strings if not given specific schema to work with.

- Overlapping points between myself and LLM were issues with quotes handling as in it won't identify quotes as independent entity but rather would split its content wherever a comma is found. Moreover, the fact that there might be issues with data type validations e.g. with thirty and 30.

- #### Step 3: use an LLM to help expand your perspective.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 

    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 


 - I believe that it needs to handle quotes as singular independant entities--"noor, Nour, Newr", 22 => ['"noor, Nour, Newr"', "22"]. Also, it needs to use zod to validate data in order to reduse the messiness. Moreover, it needs to split data cleanly and correctrly between different lines (e.g. "sally", 23, "mark", 24 
                => sally, 23
                    mark, 24)
 




### Design Choices

### 1340 Supplement

- #### 1. Correctness

- #### 2. Random, On-Demand Generation

- #### 3. Overall experience, Bugs encountered and resolved
#### Errors/Bugs: mainly with implementing the zod type
#### Tests: 
#### How To…

#### Team members and contributions (include cs logins):

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):
#### Total estimated time it took to complete project: 20 hrs
#### Link to GitHub Repo: 
