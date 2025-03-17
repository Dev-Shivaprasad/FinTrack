﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace FinTrack.Model
{
    public class IncomeModel
    {
        [Key]
        public Guid IncomeId { get; set; }
        public Guid UserId { get; set; }
        public string Source { get; set; }
        [Column(TypeName ="decimal(18,2)")]
        public decimal Amount { get; set; }
        public DateTime CreatedAt { get; set; }
        [JsonIgnore]
        public UserModel? User { get; set; }

    }
}

