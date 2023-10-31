using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace Application.Activities
{
    public class Delete
    {
        public class Command:IRequest<Result<Unit>>
        {
            public Guid Id{get;set;}
        }

        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
            private DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var act = await _context.Activities.FindAsync(request.Id);

                if(act == null)
                    return null;

                _context.Remove(act);
                var result = await _context.SaveChangesAsync() >= 1;

                if(!result)
                    return Result<Unit>.Failure("failed to delete Activitiy");
                
                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}