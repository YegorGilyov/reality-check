# Intent Prototyping: The Allure and Danger of Pure Vibe Coding in Enterprise UX (Part 1)

There is a spectrum of opinions on how dramatically all creative professions will be changed by the coming wave of agentic AI, from the very skeptical to the wildly optimistic and even apocalyptic. I think that even if you are on the "skeptical" end of the spectrum, it makes sense to explore ways this new technology can help with your everyday work. As for my everyday work, I've been doing UX and product design for about 25 years now, and I'm always keen to learn new tricks and share them with colleagues. Right now I'm interested in AI-assisted prototyping, and I'm here to share my thoughts on how it can change the process of designing digital products.

To set your expectations up front: this exploration focuses on a specific part of the product design lifecycle. Many people know about the Double Diamond framework, which shows the path from problem to solution. However, I think it's the [Triple Diamond model](https://uxdesign.cc/why-the-double-diamond-isnt-enough-adaa48a8aec1) that makes an important point for our needs. It explicitly separates the solution space into two phases: Solution Discovery (ideating and validating the right concept) and Solution Delivery (engineering the validated concept into a final product). This article is focused squarely on that middle diamond: Solution Discovery.

![[Triple Diamond.excalidraw|700]]

How AI can help with the preceding (Problem Discovery) and the following (Solution Delivery) stages is out of the scope of this article. Problem Discovery is less about prototyping and more about research, and while I believe AI can revolutionize the research process as well, I'll leave that to people more knowledgeable in the field. As for Solution Delivery, it is more about engineering optimization. There's no doubt that software engineering in the AI era is undergoing dramatic changes, but I'm not an engineer, I'm a designer, so let me focus on my "sweet spot".

And my "sweet spot" has a specific flavor: designing enterprise applications. In this world, the main challenge is taming complexity: dealing with complicated data models and guiding users through non-linear workflows. This background has had a big impact on my approach to design, putting a lot of emphasis on the underlying logic and structure. This article explores the potential of AI through this lens.

I’ll start by outlining the typical artifacts designers create during Solution Discovery. Then, I’ll examine the problems with how this part of the process often plays out in practice. Finally, we’ll explore whether AI-powered prototyping can offer a better approach, and if so, whether it aligns with what people call “vibe coding,” or calls for a more deliberate and disciplined way of working.

### What We Create During Solution Discovery

The Solution Discovery phase begins with the key output from the preceding research: a well-defined problem and a core hypothesis for a solution. This is our starting point. The artifacts we create from here are all aimed at turning that initial hypothesis into a tangible, testable concept.

Traditionally, at this stage designers can produce artifacts of different kinds, progressively increasing fidelity: from napkin sketches, boxes-and-arrows and conceptual diagrams to hi-fi mockups, then to interactive prototypes, and in some cases even live prototypes. Artifacts of lower fidelity allow fast iteration and enable exploring many alternatives, while artifacts of higher fidelity help understand, explain, and validate the concept in all its details.

It's important to think holistically, considering different aspects of the solution. I would highlight three dimensions:

1. Conceptual model: objects, relations, attributes, actions
2. Visualization: screens, from rough sketches to hi-fi mockups
3. Flow: from the very high-level user journeys to more detailed ones

One can argue that those are layers rather than dimensions, and each of them builds on the previous ones (for example, according to [Semantic IxD](https://www.interaction-design.org/literature/article/the-magic-of-semantic-interaction-design?srsltid=AfmBOoq4-4YG8RR7SDZn7CX1GJ1ZKNdiZx-trER7oKCefud3V2TjeumD) by Daniel Rosenberg), but I see them more as different facets of the same thing, so the design process through them is not necessarily linear: you may need to switch from one perspective to another many times. 

This is how different types of design artifacts map to these dimensions:

![[Artifacts.excalidraw|700]]

As Solution Discovery progresses, designers move from the left part of this map to the right, from low-fidelity to high-fidelity, from ideating to validating, from diverging to converging. Note that at the beginning of the process different dimensions are supported by artifacts of different types (boxes-and-arrows, sketches, class diagrams, etc), and only closer to the end you can build a live prototype which encompasses all three dimensions: conceptual model, visualization, and flow.

This progression shows a classic trade-off, like the difference between a pencil drawing and an oil painting. The drawing lets you explore ideas in the most flexible way, whereas the painting has a lot of detail and overall looks much more realistic but is hard to adjust. Similarly, as we go towards artifacts that integrate all the three dimensions at higher fidelity, our ability to iterate quickly and explore divergent ideas goes down. This inverse relationship has long been an accepted, almost unchallenged, limitation of the design process.

### The Problem With Mockup-Centric Approach

Faced with this difficult trade-off, often teams opt for the easiest way out. On the one hand, they need to show that they are making progress and create things that appear detailed. On the other hand they rarely can afford building interactive or live prototypes. This leads them to over-invest in one type of artifact that seems to offer the best of both worlds. As a result, the neatly organized "bento box" of design artifacts we saw previously gets shrunk down to just one compartment: creating static high-fidelity mockups.

![[Mockups.excalidraw|700]]

This choice is understandable, as several forces push designers in this direction. Stakeholders are always eager to see nice pictures, while artifacts representing user flows and conceptual models receive much less attention and priority: they are too high-level and hardly usable for validation, and usually not everyone can understand them. On the other side of the fidelity spectrum, interactive prototypes require too much effort to create and maintain, and creating live prototypes in code used to require special skills (and again, effort). And even when teams make this investment, they do so at the end of Solution Discovery, during the convergence stage, when it is often too late to experiment with fundamentally different ideas. With so much effort already sunk, there is little appetite to go back to the drawing board. It's no surprise, then, that many teams default to the perceived safety of static mockups, seeing them as a middle ground between the roughness of the sketches and the overwhelming complexity and fragility that prototypes can have.

As a result, validation with users doesn’t provide enough confidence that the solution will actually solve the problem, and teams are forced to make a leap of faith to start building. To make matters worse, they do so without a clear understanding of the conceptual model, the user flows, and the interactions, because from the very beginning, designers’ attention has been heavily skewed toward visualization.

The result is often a design artifact that resembles the famous "horse drawing" meme: beautifully rendered in the parts everyone sees first (the mockups), but dangerously underdeveloped in its underlying structure (the conceptual model and flows).

![[Horse.jpg|500]]

While this is a familiar problem across the industry, its severity depends on the nature of the project. If your core challenge is to optimize a well-understood, linear flow (like many B2C products), a mockup-centric approach can be perfectly adequate. The risks are contained, and the "lopsided horse" problem is unlikely to be fatal. However, it's different for the systems I specialize in: complex applications defined by intricate data models and non-linear, interconnected user flows. Here, the biggest risks are not on the surface but in the underlying structure, and lack of attention to the latter would be a recipe for disaster.

### Transforming The Design Process

This situation makes me wonder: how might we close the gap between our design intent and a live prototype, so that we can iterate on real functionality from day one?

![[HMW.excalidraw|700]]

If we were able to answer this question, we would: 

- **Learn faster.** By going straight from intent to a testable artifact, we cut the feedback loop from weeks to days.
- **Gain more confidence.** Users interact with real logic, which gives us more proof that the idea works.
- **Enforce conceptual clarity.** A live prototype cannot hide a flawed or ambiguous conceptual model. 
- **Establish a clear and lasting source of truth.** A live prototype combined with a clearly documented design intent gives the engineering team an unambiguous specification.

Of course, the desire for such a process is not new. This vision of a truly prototype-driven workflow is especially compelling for enterprise applications, where the benefits of faster learning and forced conceptual clarity are the best defense against costly structural flaws. But this ideal was still out of reach because prototyping in code took so much work and specialized talents. Now the rise of powerful AI coding assistants changes this equation in a big way.

### The Seductive Promise Of "Vibe Coding"

The answer seems to be obvious: vibe coding! 

> [Wikipedia](https://en.wikipedia.org/wiki/Vibe_coding): Vibe coding is an [artificial intelligence-assisted software development](https://en.wikipedia.org/wiki/AI-assisted_software_development "AI-assisted software development") style popularized by [Andrej Karpathy](https://en.wikipedia.org/wiki/Andrej_Karpathy "Andrej Karpathy") in early 2025.[[1]](https://en.wikipedia.org/wiki/Vibe_coding#cite_note-karpathy-tweet-1) It describes a fast, improvisational, collaborative approach to creating [software](https://en.wikipedia.org/wiki/Application_software "Application software") where the developer and a [large language model](https://en.wikipedia.org/wiki/Large_language_model "Large language model") (LLM) tuned for coding is acting rather like [pair programmers](https://en.wikipedia.org/wiki/Pair_Programming "Pair Programming") in a conversational loop. 

The original tweet by Andrej Karpathy: 

![[Andrej Karpathy on vibe coding.png|500]]

The allure of this approach is undeniable. If you are not a developer, you are bound to feel awe when you describe a solution in plain language, and moments later, you can interact with it. This seems to be the ultimate fulfillment of our goal: a direct, frictionless path from an idea to a live prototype. But is this method reliable enough to build our new design process around it?

#### The Trap: A Process Without a Blueprint

The pitfall of vibe coding is that it encourages us to express our intent in the most ambiguous way possible: by having a conversation. It mixes up a description of the UI with a description of the system itself, which results in a prototype that is based on changing assumptions instead of a clear, solid model.  
  
This is like hiring a builder and telling them what to do one sentence at a time without ever presenting them a blueprint. They could make a wall that looks great, but you can't be sure that it can hold weight.  
  
I'll give you one example illustrating problems you may face if you try to jump over the chasm between your idea and a live prototype relying on pure vibe coding in the spirit of Andrej Karpathy's tweet. Imagine I want to prototype a solution to keep track of tests to validate product ideas. I open my vibe coding tool of choice (I intentionally don't disclose its name, as I believe they all are awesome yet prone to similar pitfalls) and start with the following prompt:

```
I need an app to track tests. For every test I need to fill out the following data:
- Hypothesis (we believe that...) 
- Experiment (to verify that, we will...)
- When (a single date, or a period) 
- Status (New/Planned/In Progress/Proven/Disproven)
```

And in a minute or so I get a working prototype:

![[Lovable 01.png|500]]

Inspired by success, I go further: 

```
Please add the ability to specify a product idea for every test. Also, I want to filter tests by product ideas, and see how many tests in every status every product idea has. 
```

And the result is still pretty good:

![[Lovable 02.png|500]]

But then I want to extend the functionality related to product ideas: 

```
Okay, one more thing. For every product idea I want to assess the impact score, the confidence score, and the ease score, and get the overall ICE score. Perhaps I need a separate page focused on the product idea with all the information and all the related tests.
```

And from this point on, the results are getting more and more confusing.

The flow of creating tests hasn't changed much. I still can create a bunch of tests and they seem to be organized by product ideas. But when I click "Product Ideas" in the top navigation, I see nothing: 

![[Lovable 03.png|500]]

I need to create my ideas from scratch, and they are not connected to the tests I created before:

![[Lovable 04.png|500]]

Moreover, when I go back to "Tests", I see they are all gone. Clearly something went wrong, and my AI assistant confirms that:

> *No, this is not expected behavior - it's a bug! The issue is that tests are being stored in two separate places (local state in Index page and App state), so tests created on the main page don't sync with the product ideas page.* 

Sure, eventually it fixed that bug, but note that we encountered this just on the third step, when we asked to slightly extend the functionality of a very simple app. The more layers of complexity we add, the more roadblocks of this sort we are bound to face.

Also note this specific problem of a not fully thought-out relationship between two entities (product ideas and tests) is not isolated at the technical level, and therefore it didn't go away once the technical bug got fixed. The underlying conceptual model is still broken, and it manifests in the UI as well. For example, you still can create "orphan" tests that are not connected to any item from the "Product Ideas" page. As a result, you may end up with different numbers of ideas and tests on different pages of the app:  

![[Lovable discrepancy.excalidraw|700]]

Let's diagnose what really happened here. The AI's response that this is a "bug" is only half the story. The true root cause is a conceptual model failure. My prompts never explicitly defined the relationship between product ideas and tests. The AI was forced to guess, which led to the broken experience. For a simple demo, this might be a fixable annoyance. But for a data-heavy enterprise application, this kind of structural ambiguity is fatal. It demonstrates the fundamental weakness of building without a blueprint, which is precisely what vibe coding encourages.

Don't take this as a criticism of vibe coding tools. They are creating real magic. However, the fundamental truth about "garbage in, garbage out" is still valid. If you don't express your intent clearly enough, chances are the result won't fulfill your expectations.

Another problem worth mentioning is that even if you wrestle it into a state that works, the artifact is a black box that hardly can serve as reliable specifications for the final product. The initial meaning is lost in the conversation, and all that's left is the end result. This makes the development team "code archaeologists," who have to figure out what the designer was thinking by reverse-engineering the AI's code, which is frequently very complicated. Any speed gained at the start is lost right away because of this friction and uncertainty. 

### From Fast Magic to a Solid Foundation

Pure vibe coding, for all its allure, encourages building without a blueprint. As we've seen, this results in structural ambiguity, which is not acceptable when designing complex applications. We are left with a seemingly quick but fragile process that creates a black box that is difficult to iterate on and even more so to hand off. This leads us back to our main question: how might we close the gap between our design intent and a live prototype, so that we can iterate on real functionality from day one, without getting caught in the ambiguity trap? The answer lies in a more methodical, disciplined, and therefore trustworthy process.

In Part 2 of this series, "A Practical Guide to Building with Clarity", I will outline the entire workflow for **Intent Prototyping**. This method places the explicit _intent_ of the designer at the forefront of the process while embracing the potential of AI-assisted coding.

Thank you for reading, and I look forward to seeing you in ==Part 2==.