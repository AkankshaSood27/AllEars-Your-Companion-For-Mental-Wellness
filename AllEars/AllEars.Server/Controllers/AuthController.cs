﻿using AllEars.Server.Entities;
using AllEars.Server.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AllEars.Server.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] Login login)
        {
            var result = await _authService.AuthenticateAsync(login);
            if (result == null)
            {
                return Unauthorized("Invalid credentials");
            }

            return Ok(result);
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] Patient patient)
        {
            var result = await _authService.RegisterPatientAsync(patient);
            if (result == "Registration successful")
            {
                return Ok(result);
            }
            else
            {
                return BadRequest(result);
            }
        }

    }

    
}
