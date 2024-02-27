using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Variables para el registro de victorias
int playerWins = 0;
int computerWins = 0;

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();


app.MapPost("/api/game", async context =>
{
    // Leer el cuerpo de la solicitud (elección del jugador)
    using var reader = new StreamReader(context.Request.Body);
    var requestBody = await reader.ReadToEndAsync();

    // Deserializar el cuerpo de la solicitud a un objeto JSON
    var requestData = JsonSerializer.Deserialize<Dictionary<string, string>>(requestBody);

    // Obtener la elección del jugador del objeto JSON
    var playerChoice = requestData["choice"];

    // Elecciones posibles para el juego
    var choices = new[] { "rock", "paper", "scissors" };

    // Generar una elección aleatoria para el rival
    var random = new Random();
    var computerChoice = choices[random.Next(choices.Length)];

    // Calcular el resultado del juego
    string result;
    if (playerChoice == computerChoice)
    {
        result = "It's a tie!";
    }
    else if ((playerChoice == "rock" && computerChoice == "scissors") ||
             (playerChoice == "paper" && computerChoice == "rock") ||
             (playerChoice == "scissors" && computerChoice == "paper"))
    {
        result = "You win!";
        playerWins++; // Incrementar el contador de victorias del jugador
    }
    else
    {
        result = "You lose";
        computerWins++; // Incrementar el contador de victorias del rival
    }

    // Construir la respuesta
    var responseData = new
    {
        playerChoice,
        computerChoice,
        result,
        playerWins,
        computerWins
    };

    // Devolver una respuesta JSON
    context.Response.StatusCode = StatusCodes.Status200OK;
    context.Response.ContentType = "application/json";
    await context.Response.WriteAsync(JsonSerializer.Serialize(responseData));
});

app.MapPost("/api/reset", async context =>
{
    // Reiniciar los contadores de victorias
    playerWins = 0;
    computerWins = 0;

    // Construir la respuesta
    var responseData = new
    {
        playerWins,
        computerWins
    };

    // Devolver una respuesta JSON con los contadores reiniciados
    context.Response.StatusCode = StatusCodes.Status200OK;
    context.Response.ContentType = "application/json";
    await context.Response.WriteAsync(JsonSerializer.Serialize(responseData));
});


app.MapFallbackToFile("/index.html");

app.Run();
